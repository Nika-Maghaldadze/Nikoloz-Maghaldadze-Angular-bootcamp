import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { QuizService } from '../../../core/services/quiz.service';
import { PlayerService } from '../../../core/services/player.service';
import { AuthService } from '../../../core/services/auth.service';
import { Accent, Question, Screen } from '../../../core/models/quiz.model';
import { Player } from '../../../core/models/player.model';

const PER_Q_MS = 10000;
const TICK_MS = 200;
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const C = {
  ok: '#4F7A5B',
  okBg: '#EDF3EE',
  okTx: '#2F5238',
  okTint: '#F1F6F2',
  okSoft: '#D8E6DB',
  no: '#B05B47',
  noBg: '#F8EEEA',
  noTx: '#8F4636',
  noTint: '#FAF1ED',
  noSoft: '#EFD9D1',
  line: '#E8E5DD',
  dimText: '#9A968D',
  letterDimBg: '#F3F1EA',
  letterDimColor: '#B5B1A8',
} as const;

const QUIZ_META = {
  subject: 'Angular',
  difficulty: 'საშუალო დონე',
  title: 'Angular-ის საფუძვლები',
  desc:
    'Angular-ის ბირთვი — კომპონენტები, Dependency Injection, Router, NgRx და Signals. ' +
    'შეამოწმე შენი ცოდნა 10 კითხვით.',
  topics: ['Angular', 'TypeScript', 'NgRx', 'Signals', 'Router', 'Change Detection'],
} as const;

export interface InteractiveOption {
  letter: string;
  text: string;
}

export interface ResultOption {
  letter: string;
  text: string;
  border: string;
  bg: string;
  color: string;
  letterBg: string;
  letterColor: string;
  mark: string;
  markColor: string;
}

export interface Feedback {
  label: string;
  color: string;
  mark: string;
  explainBg: string;
  explainBorder: string;
}

export interface ReviewItem {
  qNumber: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  question: string;
  yourLetter: string;
  yourText: string;
  yourColor: string;
  showCorrect: boolean;
  correctLetter: string;
  correctText: string;
}

export interface LeaderRow {
  rank: string;
  rankColor: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
  name: string;
  nameWeight: number;
  meta: string;
  score: string;
  rowBg: string;
  you: boolean;
}

export interface ComingSoonCard {
  subject: string;
  title: string;
  desc: string;
}

const COMING_SOON: ComingSoonCard[] = [
  {
    subject: 'RxJS',
    title: 'Observables & Streams',
    desc: 'რეაქტიული პროგრამირება და მონაცემთა ნაკადები Angular-ში.',
  },
  {
    subject: 'Forms',
    title: 'Reactive Forms',
    desc: 'ფორმების აგება, ვალიდაცია და დინამიური კონტროლები.',
  },
  {
    subject: 'Testing',
    title: 'ტესტირება',
    desc: 'Unit და integration ტესტები Jasmine-ითა და Karma-ით.',
  },
];

/**
 * Signals-based engine for the Lyceum quiz — a 1:1 port of the reference prototype's
 * logic class. Owns all run state plus the per-question countdown timer. Provided at the
 * quiz-shell route so its lifecycle (and the timer) is tied to the quiz screen.
 */
@Injectable()
export class QuizEngineStore {
  private readonly quizService = inject(QuizService);
  private readonly playerService = inject(PlayerService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  // ---- raw state ----
  readonly screen = signal<Screen>('home');
  /** Where to go once login succeeds: back home, or straight into the quiz. */
  readonly afterLogin = signal<'home' | 'quiz'>('home');
  readonly questions = signal<Question[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly qIndex = signal(0);

  readonly runAnswers = signal<(number | null)[]>([]);
  readonly answered = signal(false);
  readonly selected = signal<number | null>(null);
  readonly timedOut = signal(false);
  readonly qMs = signal(PER_Q_MS);
  readonly totalMs = signal(0);
  readonly lastScore = signal<number | null>(null);
  readonly played = signal(false);

  readonly players = signal<Player[]>([]);
  readonly leaderboardLoading = signal(false);
  readonly leaderboardError = signal<string | null>(null);

  readonly accent = signal<Accent>('#1F1E1B');
  readonly serifQuestions = signal(false);
  readonly showTimer = signal(true);

  readonly meta = QUIZ_META;
  readonly comingSoon = COMING_SOON;

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.stopTimer());
  }

  readonly total = computed(() => this.questions().length);
  readonly current = computed<Question | null>(() => this.questions()[this.qIndex()] ?? null);

  readonly progressPct = computed(() => {
    const t = this.total();
    if (!t) return 0;
    return Math.round(((this.qIndex() + (this.answered() ? 1 : 0)) / t) * 100);
  });

  readonly qNumber = computed(() => String(this.qIndex() + 1).padStart(2, '0'));
  readonly qTotalLabel = computed(() => String(this.total()).padStart(2, '0'));

  readonly qSeconds = computed(() => Math.max(0, Math.ceil(this.qMs() / 1000)));
  private readonly low = computed(() => this.qSeconds() <= 3 && !this.answered());
  private readonly ringPct = computed(() =>
    Math.max(0, Math.min(100, (this.qMs() / PER_Q_MS) * 100))
  );
  readonly countRing = computed(() => {
    const color = this.low() ? C.no : this.accent();
    const pct = this.ringPct();
    return `conic-gradient(${color} ${pct}%, ${C.line} ${pct}% 100%)`;
  });
  readonly countColor = computed(() => (this.low() ? C.no : '#1F1E1B'));

  readonly questionFont = computed(() =>
    this.serifQuestions() ? 'var(--font-serif)' : 'var(--font-ui)'
  );

  private readonly isCorrect = computed(() => {
    const q = this.current();
    if (!q) return false;
    return this.selected() === this.answerOf(q) && !this.timedOut();
  });

  readonly options = computed<InteractiveOption[]>(
    () => this.current()?.choices.map((c, i) => ({ letter: LETTERS[i], text: c.text })) ?? []
  );

  readonly resultOptions = computed<ResultOption[]>(() => {
    const q = this.current();
    if (!q) return [];
    const answer = this.answerOf(q);
    const sel = this.selected();
    return q.choices.map((c, i) => {
      const base: ResultOption = {
        letter: LETTERS[i],
        text: c.text,
        border: C.line,
        bg: '#FFFFFF',
        color: C.dimText,
        letterBg: C.letterDimBg,
        letterColor: C.letterDimColor,
        mark: '',
        markColor: 'transparent',
      };
      if (i === answer) {
        return {
          ...base,
          border: C.ok,
          bg: C.okBg,
          color: C.okTx,
          letterBg: C.ok,
          letterColor: '#fff',
          mark: '✓',
          markColor: C.ok,
        };
      }
      if (i === sel) {
        return {
          ...base,
          border: C.no,
          bg: C.noBg,
          color: C.noTx,
          letterBg: C.no,
          letterColor: '#fff',
          mark: '✕',
          markColor: C.no,
        };
      }
      return base;
    });
  });

  readonly feedback = computed<Feedback>(() => {
    if (this.timedOut()) {
      return {
        label: 'დრო ამოიწურა',
        color: C.no,
        mark: '⏱',
        explainBg: C.noTint,
        explainBorder: C.noSoft,
      };
    }
    if (this.isCorrect()) {
      return {
        label: 'სწორია',
        color: C.ok,
        mark: '✓',
        explainBg: C.okTint,
        explainBorder: C.okSoft,
      };
    }
    return {
      label: 'არასწორი',
      color: C.no,
      mark: '✕',
      explainBg: C.noTint,
      explainBorder: C.noSoft,
    };
  });

  readonly pointsEarnedLabel = computed(() => {
    const earned = this.isCorrect() ? (this.current()?.points ?? 0) : 0;
    return `+${earned} ქულა`;
  });

  readonly nextLabel = computed(() =>
    this.qIndex() >= this.total() - 1 ? 'შედეგები' : 'შემდეგი'
  );

  // ---- derived: results / review ----
  readonly correctCount = computed(() => {
    const answers = this.runAnswers();
    return this.questions().reduce(
      (acc, q, i) => (answers[i] === this.answerOf(q) ? acc + 1 : acc),
      0
    );
  });

  readonly scorePct = computed(() => {
    const t = this.total();
    if (!t) return 0;
    return this.lastScore() ?? Math.round((this.correctCount() / t) * 100);
  });

  private readonly pointsPer = computed(() => this.questions()[0]?.points ?? 10);
  readonly pointsLabel = computed(
    () => `${this.correctCount() * this.pointsPer()} / ${this.total() * this.pointsPer()}`
  );
  readonly elapsedFmt = computed(() => this.fmt(this.totalMs()));

  readonly performanceLabel = computed(() => {
    const p = this.scorePct();
    return p >= 80 ? 'შესანიშნავი' : p >= 60 ? 'კარგი' : p >= 40 ? 'საშუალო' : 'გასაუმჯობესებელი';
  });
  readonly resultTitle = computed(() => {
    const p = this.scorePct();
    return p >= 80
      ? 'შესანიშნავია!'
      : p >= 60
        ? 'კარგი შედეგია.'
        : p >= 40
          ? 'კარგი დასაწყისი.'
          : 'სცადე თავიდან.';
  });
  readonly resultFeedbackColor = computed(() => (this.scorePct() >= 60 ? C.ok : C.no));
  readonly resultQuizTitle = computed(() => `${this.meta.subject} · ${this.meta.title}`);
  readonly ringBg = computed(() => {
    const pct = this.scorePct();
    return `conic-gradient(${this.accent()} ${pct}%, ${C.line} ${pct}% 100%)`;
  });

  readonly reviewItems = computed<ReviewItem[]>(() => {
    const answers = this.runAnswers();
    return this.questions().map((q, i) => {
      const answer = this.answerOf(q);
      const yi = answers[i];
      const correct = yi === answer;
      const noAns = yi === null || yi === undefined;
      return {
        qNumber: 'Q' + String(i + 1).padStart(2, '0'),
        tag: correct ? 'სწორი' : noAns ? 'დრო ამოიწურა' : 'არასწორი',
        tagColor: correct ? C.okTx : C.noTx,
        tagBg: correct ? C.okBg : C.noBg,
        question: q.text,
        yourLetter: noAns ? '—' : LETTERS[yi],
        yourText: noAns ? 'პასუხი არ არის' : q.choices[yi].text,
        yourColor: correct ? C.okTx : C.noTx,
        showCorrect: !correct,
        correctLetter: LETTERS[answer],
        correctText: q.choices[answer].text,
      };
    });
  });

  // ---- derived: leaderboard (live players, current user highlighted) ----
  readonly leaders = computed<LeaderRow[]>(() => {
    const accent = this.accent();
    const meId = this.auth.currentUser()?.id ?? null;

    const sorted = [...this.players()].sort(
      (a, b) => b.bestScore - a.bestScore || a.bestTimeMs - b.bestTimeMs
    );

    return sorted.map((p, i) => {
      const you = meId !== null && p.id === meId;
      const meta = p.bestScore > 0 ? `Angular · ${this.fmt(p.bestTimeMs)}` : 'ჯერ არ გითამაშია';
      return {
        rank: String(i + 1).padStart(2, '0'),
        rankColor: you ? accent : '#9A968D',
        initial: p.name.charAt(0) || '?',
        avatarBg: you ? accent : '#F0EEE7',
        avatarColor: you ? '#FAF9F6' : '#6B6862',
        name: p.name,
        nameWeight: you ? 600 : 500,
        meta,
        score: `${p.bestScore}%`,
        rowBg: you ? '#F6F4EE' : '#FFFFFF',
        you,
      };
    });
  });

  // ---- actions ----
  load(): void {
    this.quizService
      .getQuestions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (questions) => {
          this.questions.set(questions);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('კითხვების ჩატვირთვა ვერ მოხერხდა.');
          this.loading.set(false);
        },
      });
  }

  startQuiz(): void {
    this.qIndex.set(0);
    this.runAnswers.set([]);
    this.answered.set(false);
    this.selected.set(null);
    this.timedOut.set(false);
    this.qMs.set(PER_Q_MS);
    this.totalMs.set(0);
    this.lastScore.set(null);
    this.screen.set('quiz');
    this.startTimer();
  }

  selectOption(i: number): void {
    if (this.answered()) return;
    const run = this.runAnswers().slice();
    run[this.qIndex()] = i;
    this.runAnswers.set(run);
    this.answered.set(true);
    this.selected.set(i);
    this.timedOut.set(false);
  }

  next(): void {
    if (this.qIndex() >= this.total() - 1) {
      this.finish();
      return;
    }
    this.qIndex.update((v) => v + 1);
    this.answered.set(false);
    this.selected.set(null);
    this.timedOut.set(false);
    this.qMs.set(PER_Q_MS);
  }

  finish(): void {
    this.stopTimer();
    const t = this.total();
    const pct = t ? Math.round((this.correctCount() / t) * 100) : 0;
    this.lastScore.set(pct);
    this.played.set(true);
    this.screen.set('results');
    this.saveResult(pct, this.totalMs());
  }

  loadLeaderboard(): void {
    this.leaderboardLoading.set(true);
    this.leaderboardError.set(null);
    this.playerService
      .list()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (players) => {
          this.players.set(players);
          this.leaderboardLoading.set(false);
        },
        error: () => {
          this.leaderboardError.set('ლიდერბორდის ჩატვირთვა ვერ მოხერხდა.');
          this.leaderboardLoading.set(false);
        },
      });
  }

  /** Persist the run to the logged-in player, keeping only their best score. */
  private saveResult(pct: number, timeMs: number): void {
    const user = this.auth.currentUser();
    if (!user?.id) return;

    const isBetter =
      pct > user.bestScore || (pct === user.bestScore && timeMs < user.bestTimeMs);
    const patch = {
      lastPlayedAt: new Date().toISOString(),
      ...(isBetter ? { bestScore: pct, bestTimeMs: timeMs } : {}),
    };

    this.playerService
      .update(user.id, patch)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updated) => {
          this.auth.applyResult(updated);
          this.loadLeaderboard();
        },
        error: () => {
          /* keep the local result on screen even if the save fails */
        },
      });
  }

  go(screen: Screen): void {
    if (screen !== 'quiz') this.stopTimer();
    this.screen.set(screen);
  }

  /** Start the quiz, first routing through login when the user isn't authenticated. */
  requestStart(): void {
    if (this.auth.isAuthenticated()) {
      this.startQuiz();
      return;
    }
    this.afterLogin.set('quiz');
    this.go('login');
  }

  /** Called by the login screen on success: resume the intended destination. */
  completeLogin(): void {
    const intent = this.afterLogin();
    this.afterLogin.set('home');
    if (intent === 'quiz') this.startQuiz();
    else this.go('home');
  }

  setAccent(accent: Accent): void {
    this.accent.set(accent);
  }

  // ---- timer ----
  private startTimer(): void {
    this.stopTimer();
    this.intervalId = setInterval(() => this.tick(), TICK_MS);
  }

  private stopTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private tick(): void {
    if (this.screen() !== 'quiz') return;
    this.totalMs.update((v) => v + TICK_MS);

    if (this.answered() || !this.showTimer()) return;

    const next = this.qMs() - TICK_MS;
    if (next <= 0) {
      this.qMs.set(0);
      const run = this.runAnswers().slice();
      run[this.qIndex()] = null;
      this.runAnswers.set(run);
      this.answered.set(true);
      this.selected.set(null);
      this.timedOut.set(true);
    } else {
      this.qMs.set(next);
    }
  }

  // ---- helpers ----
  private answerOf(q: Question): number {
    return q.choices.findIndex((c) => c.isCorrect);
  }

  private fmt(ms: number): string {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}
