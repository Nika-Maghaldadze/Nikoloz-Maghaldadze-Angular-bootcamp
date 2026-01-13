import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizState } from './quiz.reducer';
import { QuizView } from '../../../core/models/quiz.model';

export const selectQuizState = createFeatureSelector<QuizState>('quiz');

export const selectLoading = createSelector(selectQuizState, (s) => s.loading);
export const selectError = createSelector(selectQuizState, (s) => s.error);

export const selectQuestions = createSelector(selectQuizState, (s) => s.questions);
export const selectUser = createSelector(selectQuizState, (s) => s.user);
export const selectAnswers = createSelector(selectQuizState, (s) => s.answers);
export const selectStepIndex = createSelector(selectQuizState, (s) => s.currentStepIndex);

export const selectTotalSteps = createSelector(selectQuestions, (q) => q.length + 2);

export const selectView = createSelector(
  selectStepIndex,
  selectQuestions,
  (index, questions): QuizView => {
    if (index === 0) return 'INTRO';
    if (index > questions.length) return 'RESULTS';
    return 'QUESTION';
  }
);

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectStepIndex,
  (questions, index) => questions[index - 1] ?? null
);

export const selectCurrentAnswer = createSelector(
  selectAnswers,
  selectCurrentQuestion,
  (answers, q) => (q ? answers[q.id] ?? null : null)
);

export const selectProgressPercent = createSelector(
  selectStepIndex,
  selectTotalSteps,
  selectQuestions,
  (index, total, questions) => {
    if (questions.length > 0 && index > questions.length) return 100;
    const pct = (index / Math.max(1, total - 1)) * 100;
    return Math.max(0, Math.min(100, pct));
  }
);

export const selectTotalScore = createSelector(
  selectQuestions,
  selectAnswers,
  (questions, answers) => {
    let score = 0;

    for (const q of questions) {
      const userAnswer = answers[q.id];
      if (!userAnswer) continue;

      if (q.type === 'single') {
        if (typeof userAnswer !== 'string') continue;
        const choice = q.choices.find((c) => c.id === userAnswer);
        if (choice?.isCorrect) score += q.points;
      } else {
        if (!Array.isArray(userAnswer)) continue;
        const correct = new Set(q.choices.filter((c) => c.isCorrect).map((c) => c.id));
        const selected = new Set(userAnswer);

        let missed = false;
        for (const cid of correct) if (!selected.has(cid)) missed = true;

        let wrong = false;
        for (const sid of selected) if (!correct.has(sid)) wrong = true;

        if (!missed && !wrong) score += q.points;
      }
    }

    return score;
  }
);
