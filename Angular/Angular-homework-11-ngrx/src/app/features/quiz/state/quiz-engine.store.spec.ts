import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { computed, signal } from '@angular/core';
import { of } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { QuizEngineStore } from './quiz-engine.store';
import { AuthService } from '../../../core/services/auth.service';
import { PlayerService } from '../../../core/services/player.service';
import { Question } from '../../../core/models/quiz.model';
import { Player } from '../../../core/models/player.model';

/** Builds a single-choice question whose correct answer sits at `correctIndex`. */
function makeQuestion(id: string, correctIndex: number): Question {
  return {
    id,
    text: `question ${id}`,
    type: 'single',
    points: 10,
    choices: Array.from({ length: 4 }, (_, i) => ({
      id: `${id}${i}`,
      text: `${id} option ${i}`,
      isCorrect: i === correctIndex,
    })),
  };
}

const QUESTIONS: Question[] = [makeQuestion('q1', 1), makeQuestion('q2', 0), makeQuestion('q3', 2)];

/** Minimal in-memory stand-ins so the store test never touches HTTP. */
function makeFakeAuth() {
  const currentUser = signal<Player | null>(null);
  return {
    currentUser,
    isAuthenticated: computed(() => currentUser() !== null),
    applyResult: vi.fn(),
  };
}

function makeFakePlayers() {
  return {
    list: vi.fn(() => of([] as Player[])),
    update: vi.fn((id: string, patch: Partial<Player>) => of({ id, ...patch } as Player)),
  };
}

describe('QuizEngineStore', () => {
  let store: QuizEngineStore;
  let auth: ReturnType<typeof makeFakeAuth>;
  let players: ReturnType<typeof makeFakePlayers>;

  beforeEach(() => {
    vi.useFakeTimers();
    auth = makeFakeAuth();
    players = makeFakePlayers();
    TestBed.configureTestingModule({
      providers: [
        QuizEngineStore,
        provideHttpClient(),
        { provide: AuthService, useValue: auth },
        { provide: PlayerService, useValue: players },
      ],
    });
    store = TestBed.inject(QuizEngineStore);
    store.questions.set(QUESTIONS);
    store.loading.set(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('scores correct answers and formats points out of the max', () => {
    store.runAnswers.set([1, 0, 0]); // q1 ✓, q2 ✓, q3 ✗

    expect(store.correctCount()).toBe(2);
    expect(store.scorePct()).toBe(67); // round(2/3 * 100)
    expect(store.pointsLabel()).toBe('20 / 30');
  });

  it('locks immediately when an answer is selected', () => {
    store.startQuiz();
    store.selectOption(1); // correct for q1

    expect(store.answered()).toBe(true);
    expect(store.timedOut()).toBe(false);
    expect(store.runAnswers()[0]).toBe(1);
    expect(store.feedback().label).toBe('სწორია');
    expect(store.resultOptions()[1].mark).toBe('✓');
  });

  it('records null and marks timed out after 10s with no answer', () => {
    store.startQuiz();

    vi.advanceTimersByTime(10000);

    expect(store.answered()).toBe(true);
    expect(store.timedOut()).toBe(true);
    expect(store.selected()).toBeNull();
    expect(store.runAnswers()[0]).toBeNull();
    expect(store.qSeconds()).toBe(0);
    expect(store.feedback().label).toBe('დრო ამოიწურა');
    expect(store.totalMs()).toBeGreaterThanOrEqual(10000);
  });

  it('advances to the next question and resets the per-question clock', () => {
    store.startQuiz();
    store.selectOption(1);
    store.next();

    expect(store.qIndex()).toBe(1);
    expect(store.qMs()).toBe(10000);
    expect(store.answered()).toBe(false);
    expect(store.selected()).toBeNull();
  });

  it('finishes on the last question and routes to results', () => {
    store.startQuiz();
    store.runAnswers.set([1, 0, 2]); // all correct
    store.qIndex.set(2);

    store.next(); // last index → finish()

    expect(store.screen()).toBe('results');
    expect(store.played()).toBe(true);
    expect(store.lastScore()).toBe(100);
  });

  it('builds a review row with the correct answer for wrong picks', () => {
    store.runAnswers.set([1, 3, 2]); // q2 wrong (picked 3, answer 0)

    const rows = store.reviewItems();
    expect(rows[1].tag).toBe('არასწორი');
    expect(rows[1].showCorrect).toBe(true);
    expect(rows[1].correctLetter).toBe('A');
  });

  it('ranks players by best score and highlights the current user', () => {
    auth.currentUser.set({
      id: 'me',
      name: 'Me',
      email: 'me@x.com',
      bestScore: 90,
      bestTimeMs: 90000,
      lastPlayedAt: null,
    });
    store.players.set([
      { id: 'a', name: 'Ana', email: 'a@x.com', bestScore: 80, bestTimeMs: 90000, lastPlayedAt: null },
      { id: 'me', name: 'Me', email: 'me@x.com', bestScore: 90, bestTimeMs: 90000, lastPlayedAt: null },
    ]);

    const leaders = store.leaders();
    expect(leaders[0].you).toBe(true); // 90 sorts above 80
    expect(leaders[0].rank).toBe('01');
    expect(leaders[0].score).toBe('90%');
    expect(leaders[1].you).toBe(false);
  });

  it('persists a better score to the player on finish', () => {
    auth.currentUser.set({
      id: 'me',
      name: 'Me',
      email: 'me@x.com',
      bestScore: 0,
      bestTimeMs: 0,
      lastPlayedAt: null,
    });
    store.startQuiz();
    store.runAnswers.set([1, 0, 2]); // all correct → 100%
    store.qIndex.set(2);

    store.next(); // → finish() → saveResult()

    expect(players.update).toHaveBeenCalledTimes(1);
    const [id, patch] = players.update.mock.calls[0];
    expect(id).toBe('me');
    expect(patch.bestScore).toBe(100);
    expect(auth.applyResult).toHaveBeenCalled();
  });
});
