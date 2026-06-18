import { describe, expect, it } from 'vitest';

import { Question, QuizProgress } from '../../../core/models/quiz.model';
import { QuizActions } from './quiz.actions';
import { initialState, quizReducer, QuizState } from './quiz.reducer';

const question: Question = {
  id: 'q1',
  text: 'Q1',
  type: 'single',
  points: 1,
  choices: [{ id: 'a', text: 'A', isCorrect: true }],
};

const loaded: QuizState = {
  ...initialState,
  questions: [question],
  user: { name: 'Ann', email: 'ann@example.com' },
  answers: { q1: 'a' },
  step: 1,
};

describe('quizReducer', () => {
  it('starts not loading', () => {
    expect(initialState.loading).toBe(false);
  });

  it('init sets loading and clears any error', () => {
    const state = quizReducer({ ...initialState, error: 'boom' }, QuizActions.init());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('loadQuestionsSuccess stores questions and stops loading', () => {
    const state = quizReducer(
      { ...initialState, loading: true },
      QuizActions.loadQuestionsSuccess({ questions: [question] })
    );
    expect(state.questions).toEqual([question]);
    expect(state.loading).toBe(false);
  });

  it('restart resets progress but keeps loaded questions', () => {
    const state = quizReducer(loaded, QuizActions.restart());
    expect(state.questions).toEqual([question]); // kept
    expect(state.user).toBeNull();
    expect(state.answers).toEqual({});
    expect(state.step).toBe(0);
    expect(state.loading).toBe(false);
  });

  it('hydrate merges saved progress', () => {
    const progress: QuizProgress = {
      user: { name: 'Bob', email: 'bob@example.com' },
      answers: { q1: 'a' },
      step: 1,
    };
    const state = quizReducer(initialState, QuizActions.hydrate({ progress }));
    expect(state.user).toEqual(progress.user);
    expect(state.answers).toEqual(progress.answers);
    expect(state.step).toBe(1);
  });

  it('prevStep never goes below 0', () => {
    const state = quizReducer({ ...initialState, step: 0 }, QuizActions.prevStep());
    expect(state.step).toBe(0);
  });

  it('nextStep advances the step', () => {
    const state = quizReducer({ ...initialState, step: 1 }, QuizActions.nextStep());
    expect(state.step).toBe(2);
  });

  it('answerQuestion records the answer', () => {
    const state = quizReducer(
      initialState,
      QuizActions.answerQuestion({ questionId: 'q1', answer: 'a' })
    );
    expect(state.answers).toEqual({ q1: 'a' });
  });
});
