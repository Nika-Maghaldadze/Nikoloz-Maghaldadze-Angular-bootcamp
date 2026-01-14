import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { quizReducer } from './quiz.reducer';
import { QuizEffects } from './quiz.effects';

export function provideQuizFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState({ name: 'quiz', reducer: quizReducer }),
    provideEffects(QuizEffects),
  ]);
}
