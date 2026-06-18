import { createFeature, createReducer, on } from '@ngrx/store';
import { QuizActions } from './quiz.actions';
import { AnswerValue, Question, User } from '../../../core/models/quiz.model';

export interface QuizState {
  user: User | null;
  questions: Question[];
  answers: Record<string, AnswerValue>;
  step: number;
  loading: boolean;
  error: string | null;
}

export const initialState: QuizState = {
  user: null,
  questions: [],
  answers: {},
  step: 0,
  loading: false,
  error: null,
};

export const quizReducer = createReducer(
  initialState,

  on(QuizActions.init, (s) => ({ ...s, loading: true, error: null })),

  on(QuizActions.hydrate, (s, { progress }) => ({
    ...s,
    user: progress.user,
    answers: progress.answers,
    step: progress.step,
  })),

  on(QuizActions.loadQuestionsSuccess, (s, { questions }) => ({
    ...s,
    questions,
    loading: false,
  })),

  on(QuizActions.loadQuestionsFailure, (s, { error }) => ({
    ...s,
    error,
    loading: false,
  })),

  on(QuizActions.setUser, (s, { user }) => ({ ...s, user })),

  on(QuizActions.answerQuestion, (s, { questionId, answer }) => ({
    ...s,
    answers: { ...s.answers, [questionId]: answer },
  })),

  on(QuizActions.nextStep, (s) => ({ ...s, step: s.step + 1 })),
  on(QuizActions.prevStep, (s) => ({ ...s, step: Math.max(0, s.step - 1) })),

  // Reset only the user's progress; keep the already-loaded questions so the
  // quiz returns to the intro immediately instead of re-fetching/spinning.
  on(QuizActions.restart, (s) => ({
    ...s,
    user: null,
    answers: {},
    step: 0,
    error: null,
  }))
);

// Single source of truth for the feature key: generates the base state slice
// selectors (selectUser, selectQuestions, …) consumed by quiz.selectors.ts.
export const quizFeature = createFeature({
  name: 'quiz',
  reducer: quizReducer,
});
