import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizState } from './quiz.reducer';

export const selectQuiz = createFeatureSelector<QuizState>('quiz');

export const selectUser = createSelector(selectQuiz, (s) => s.user);
export const selectQuestions = createSelector(selectQuiz, (s) => s.questions);
export const selectAnswers = createSelector(selectQuiz, (s) => s.answers);
export const selectStep = createSelector(selectQuiz, (s) => s.step);
export const selectLoading = createSelector(selectQuiz, (s) => s.loading);
export const selectError = createSelector(selectQuiz, (s) => s.error);

export const selectView = createSelector(selectStep, selectQuestions, (step, questions) => {
  if (step === 0) return 'INTRO';
  if (step > questions.length) return 'RESULTS';
  return 'QUESTION';
});

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectStep,
  (q, step) => q[step - 1] ?? null
);

export const selectCurrentAnswer = createSelector(selectAnswers, selectCurrentQuestion, (a, q) =>
  q ? a[q.id] ?? null : null
);

export const selectProgressPercent = createSelector(
  selectStep,
  selectQuestions,
  (step, q) => (step / Math.max(1, q.length + 1)) * 100
);

export const selectTotalScore = createSelector(
  selectQuestions,
  selectAnswers,
  (questions, answers) =>
    questions.reduce((sum, q) => {
      const a = answers[q.id];
      if (!a) return sum;
      if (q.type === 'single') {
        return sum + (q.choices.find((c) => c.id === a)?.isCorrect ? q.points : 0);
      }
      const correct = q.choices.filter((c) => c.isCorrect).map((c) => c.id);
      return correct.every((id) => (a as string[]).includes(id)) ? sum + q.points : sum;
    }, 0)
);
