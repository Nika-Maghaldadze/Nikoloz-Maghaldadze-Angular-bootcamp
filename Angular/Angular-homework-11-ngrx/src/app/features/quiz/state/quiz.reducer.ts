import { createReducer, on } from '@ngrx/store';
import { AnswerValue, Question, User } from '../../../core/models/quiz.model';
import { QuizActions } from './quiz.actions';

export interface QuizState {
  user: User | null;
  questions: Question[];
  answers: Record<string, AnswerValue>;
  currentStepIndex: number;
  loading: boolean;
  error: string | null;
}

export const initialState: QuizState = {
  user: null,
  questions: [],
  answers: {},
  currentStepIndex: 0,
  loading: true,
  error: null,
};

export const quizReducer = createReducer(
  initialState,

  on(QuizActions.loadQuestionsSuccess, (state, { questions }) => ({
    ...state,
    questions,
    loading: false,
    error: null,
  })),

  on(QuizActions.loadQuestionsFailure, (state, { error }) => ({
    ...state,
    questions: [],
    loading: false,
    error,
  })),

  on(QuizActions.hydrateFromStorage, (state, { user, answers, stepIndex }) => ({
    ...state,
    user,
    answers,
    currentStepIndex: stepIndex,
  })),

  on(QuizActions.setUser, (state, { user }) => ({ ...state, user })),

  on(QuizActions.answerQuestion, (state, { questionId, answer }) => ({
    ...state,
    answers: { ...state.answers, [questionId]: answer },
  })),

  on(QuizActions.nextStep, (state) => ({
    ...state,
    currentStepIndex: state.currentStepIndex + 1,
  })),

  on(QuizActions.prevStep, (state) => ({
    ...state,
    currentStepIndex: Math.max(0, state.currentStepIndex - 1),
  })),

  on(QuizActions.restart, (state) => ({
    ...initialState,
    questions: state.questions,
    loading: false,
  }))
);
