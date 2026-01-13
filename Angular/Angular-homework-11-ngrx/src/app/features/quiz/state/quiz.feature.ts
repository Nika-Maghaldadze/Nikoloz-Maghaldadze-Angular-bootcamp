import { provideState } from '@ngrx/store';
import { quizReducer } from './quiz.reducer';

export const provideQuizFeature = () => [
  provideState({ name: 'quiz', reducer: quizReducer }),
];
