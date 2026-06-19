# Handoff: Angular Quiz App ("Lyceum")

## Overview
A calm, academic, monochrome quiz experience for studying Angular. A single quiz of 10
multiple-choice questions (Georgian language) with a **10-second per-question countdown**,
inline correct/wrong feedback, a points/score summary, an answer review screen, and a
leaderboard. This document is the spec for recreating it in **your Angular application**.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype
that shows the intended look, layout, and behavior. They are **not** production code to copy.
The prototype was authored in an HTML/React-style runtime; **your task is to recreate these
designs as native Angular components** (standalone components + Signals recommended) using
your app's existing patterns, router, and styling approach (SCSS / Tailwind / CSS — whatever
you already use).

- `Lyceum Quiz.html` — self-contained, double-click to open in a browser. Use it as the
  visual + interaction source of truth. Click through every screen to see states.
- `Lyceum Quiz (reference).dc.html` — the source template + logic (readable markup and a
  JS class). Useful for reading exact styles and the timer/scoring logic.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions. Recreate the UI
to match, using your codebase's component and styling conventions.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| `paper` | `#FAF9F6` | App background (warm off-white) |
| `surface` | `#FFFFFF` | Cards, panels |
| `surface-alt` | `#FBFAF7` | Locked/"coming soon" cards |
| `ink` | `#1F1E1B` | Primary text, primary buttons, dark hero |
| `ink-soft` | `#6B6862` | Secondary text |
| `ink-mute` | `#9A968D` | Tertiary text, mono labels |
| `line` | `#E4E1D9` / `#E8E5DD` | Borders / card borders |
| `line-soft` | `#EEEBE3` / `#F0EEE7` | Inner dividers |
| `fill` | `#F3F1EA` | Subtle chips/letter badges |
| **Hero (dark) internals** | `#2A2925` chip bg, `#332F2A` button bg, `#3A3934`/`#43403A` borders, `#A8A49B`/`#B4B0A7`/`#D8D4CB` muted text | |
| **Correct (desaturated forest)** | border `#4F7A5B`, bg `#EDF3EE`, text `#2F5238`, tint `#F1F6F2`, border-soft `#D8E6DB` | |
| **Wrong / timeout (terracotta)** | border `#B05B47`, bg `#F8EEEA`, text `#8F4636`, tint `#FAF1ED`, border-soft `#EFD9D1` | |

Accent is `ink` by default. It is themeable — the prototype offers `#1F1E1B` (ink),
`#3B5C45` (forest), `#2E3F6E` (indigo), `#6E2F39` (claret). Accent recolors: progress bar,
countdown ring, primary buttons, score ring, leaderboard "you" row. Keep correct/wrong
colors fixed (semantic).

### Typography
Load via Google Fonts:
- **Newsreader** (serif) — the brand wordmark and English display headings. Weights 400/500/600.
- **Noto Serif Georgian** (serif) — Georgian headings / titles (pairs with Newsreader). 500/600.
- **IBM Plex Sans** (sans) — Latin UI text. 400/500/600.
- **Noto Sans Georgian** (sans) — Georgian UI/body text. 400/500/600.
- **IBM Plex Mono** (mono) — labels, counters, timers, scores, eyebrows. 400/500.

Font stacks used:
- Body/UI: `'IBM Plex Sans','Noto Sans Georgian',sans-serif`
- Georgian headings: `'Noto Serif Georgian','Newsreader',serif`
- Mono labels: `'IBM Plex Mono',monospace`

Representative sizes (px): page H1 46 / line-height 1.05 / weight 500 / letter-spacing -0.015em;
hero title 31; card title 22–24; question text 29 / line-height 1.32; option text 17;
body 15–16 / line-height 1.6; mono eyebrows 11 / letter-spacing 0.2em / uppercase;
mono meta 12–13.

### Spacing / Radius / Shadow
- Card radius `16px`, hero/panel radius `18px`, button/option radius `12px`, chips `7–8px`,
  pills/badges `20px` (full).
- Card padding `26px 24px`; hero padding `38px 40px`; option padding `18px 22px`.
- Page max-widths: home `1000px`, quiz/results/review `760px`, leaderboard `680px`; nav padding `0 40px`.
- Card hover shadow: `0 12px 28px rgba(31,30,27,0.08)`; nav uses `backdrop-filter: blur(12px)`
  over `rgba(250,249,246,0.85)`.
- Borders: 1px standard; option borders `1.5px`; locked cards use `1px dashed #DAD6CD`.

---

## Screens / Views

A single-page app with a top nav (sticky, 72px, `Lyceum` wordmark + `კურსი` / `ლიდერბორდი`
links + avatar). Five views switched by a `screen` signal: `home`, `quiz`, `results`,
`review`, `leaderboard`.

### 1. Home (`home`)
- **Purpose:** Entry point; start the quiz.
- **Layout:** Eyebrow (`სასწავლო კურსი`) → H1 `ისწავლე Angular` → intro paragraph → a large
  dark **hero card** (the quiz) → `სხვა თემები` label → 3-column grid of locked
  "coming soon" cards.
- **Hero card (dark, `ink` bg):** subject `ANGULAR` + difficulty pill `საშუალო დონე`;
  title `Angular-ის საფუძვლები`; description; a wrap of **topic chips**
  (`Angular, TypeScript, NgRx, Signals, Router, Change Detection`); right column shows
  `10 კითხვა / 10 წმ თითო / 100 ქულა` (mono) and a `დაწყება →` button. Entire card is the
  click target → starts the quiz. Hover: `filter: brightness(1.12)`.
- **Coming-soon cards (×3):** dashed border, dimmed text, `მალე` badge, NOT clickable.
  Content: RxJS "Observables & Streams", Forms "Reactive Forms", Testing "ტესტირება".
  (These are placeholders — drop or replace with real future quizzes.)

### 2. Question + Feedback (`quiz`)
- **Purpose:** Answer one question at a time under a 10s timer.
- **Header row:** back link `← კურსი` (exits to home) · subject `Angular` ·
  **countdown badge** (46px circle, conic-gradient ring depleting from accent; center shows
  remaining whole seconds in mono). In the **final 3 seconds** ring + number turn terracotta
  `#B05B47`.
- **Progress row:** thin 4px track, accent fill at `((qIndex + answered?1:0) / total) * 100`%
  with `transition: width .4s`; right: mono `NN / 10`.
- **Question:** large heading (sans by default; serif is a toggle).
- **Options (unanswered):** vertical list of 4 buttons, each `[A|B|C|D]` mono letter badge +
  text. Hover: border → `#1F1E1B`, bg → `#FFFEFB`.
- **Options (answered):** same rows, non-interactive, recolored by state — correct = forest,
  the picked-wrong one = terracotta with `✓`/`✕` mark, others dimmed.
- **Feedback bar:** colored pill showing mark + label (`სწორია` / `არასწორი` /
  `დრო ამოიწურა`) on the left, `+N ქულა` on the right.
- **Next button** (`accent` bg): label `შემდეგი`, or `შედეგები` on the last question.

### 3. Results (`results`)
- Eyebrow `Angular · Angular-ის საფუძვლები`; H1 outcome line by score band
  (`შესანიშნავია!` ≥80, `კარგი შედეგია.` ≥60, `კარგი დასაწყისი.` ≥40, else `სცადე თავიდან.`).
- **Score panel:** left = 160px **score ring** (conic-gradient accent to `pct`%) with the
  percentage + `ქულა` in the hole; right = stat rows: `სწორი პასუხები N/10`,
  `დაგროვილი ქულა X/100`, `დახარჯული დრო mm:ss`, `შეფასება <word>`.
- **Buttons:** `პასუხების გადახედვა` (primary → review), `თავიდან დაწყება` (retake),
  `ლიდერბორდი`.

### 4. Review (`review`)
- Back link `← შედეგებზე დაბრუნება`. One card per question: `QNN` + status tag
  (`სწორი` / `არასწორი` / `დრო ამოიწურა`), the question, `შენი პასუხი` row, and (when wrong)
  a `სწორი პასუხი` row in forest green. Footer buttons: retake / back to home.

### 5. Leaderboard (`leaderboard`)
- Eyebrow `ამ კვირაში`, H1 `ლიდერბორდი`. Ranked rows (mono rank, avatar initial, name + mono
  meta, score%). The current user row (`შენ`) is highlighted with `#F6F4EE` bg and accent
  rank/avatar, inserted by score and re-sorted. Footer: back to home.

---

## Interactions & Behavior
- **Navigation:** nav links + in-screen buttons switch the `screen` value. No URL routing in
  the prototype — in Angular, map each screen to a route (`/`, `/quiz`, `/results`,
  `/review`, `/leaderboard`) or keep a single component with a signal, your call.
- **Per-question timer (core feature):** on entering a question, countdown starts at
  **10000ms**. A single interval ticks every **200ms**: it always accumulates total quiz time;
  while the question is unanswered it also decrements the question clock. When it reaches 0 the
  question auto-locks as **timed out** (recorded answer = `null`), reveals the correct option,
  and shows `დრო ამოიწურა`. Selecting an answer stops the decrement (sets `answered=true`).
  `Next` resets the clock to 10000ms for the following question. Clear the interval on
  finish / leaving the quiz / component destroy.
- **Answering:** first click locks the question (no changing answers). Correct → forest;
  wrong → your pick terracotta + correct one forest.
- **Scoring:** `points` per question = 10. Score% = correctCount / total × 100. Points =
  correctCount × 10 out of total × 10.
- **Transitions:** progress + ring widths animate (`.4s`). No entrance/opacity animations
  (intentionally removed — they conflicted with the per-second re-render).
- **Hover states:** primary buttons `filter: brightness(1.15)`; outline buttons border →
  `#1F1E1B`; cards lift `translateY(-3px)` + shadow; nav links bg `#F0EEE7`.

## State Management
Recommended Angular Signals:
- `screen: signal<'home'|'quiz'|'results'|'review'|'leaderboard'>`
- `qIndex: signal<number>`
- `answers: signal<(number|null)[]>` — chosen choice index per question; `null` = timed out
- `answered: signal<boolean>`, `selected: signal<number|null>`, `timedOut: signal<boolean>`
- `qMs: signal<number>` (per-question countdown), `totalMs: signal<number>`
- `lastScorePct`, `played: signal<boolean>`
- Computed signals for: current question, progress %, countdown seconds (`ceil(qMs/1000)`),
  ring gradient string, option render-state, correctCount, score%, points, review rows,
  leaderboard (base list + inserted user, sorted desc).
- Timer: `setInterval(…, 200)` started in the start-quiz action, cleared in `ngOnDestroy`
  and when leaving the quiz screen. (Or an RxJS `interval(200)` with `takeUntilDestroyed`.)

## Data
You already have the questions as JSON (the file you shared). Map it to the engine:
- Each question: `{ id, text, type:'single', points:10, choices:[{ id, text, isCorrect }] }`.
- Derive the correct index from `choices.findIndex(c => c.isCorrect)`.
- The prototype hardcodes the same 10 questions; in your app, load from the JSON / an API.

## Assets
No image assets. Everything is type, CSS, and CSS conic-gradients (rings). Only dependency is
the Google Fonts listed above — install them however your app prefers (self-host or `<link>`).

## Files
- `Lyceum Quiz.html` — standalone, runnable reference (open in browser).
- `Lyceum Quiz (reference).dc.html` — source template + logic class to read exact styles,
  the timer loop, and scoring.
- `quiz-data.json` — the 10 Angular questions in the schema above.
