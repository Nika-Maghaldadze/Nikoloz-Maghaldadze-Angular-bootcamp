import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { quizReducer } from './quiz.reducer';
import { QuizEffects } from './quiz.effects';

export const provideQuizFeature = () => [
  provideState({ name: 'quiz', reducer: quizReducer }),
  provideEffects(QuizEffects),
];
