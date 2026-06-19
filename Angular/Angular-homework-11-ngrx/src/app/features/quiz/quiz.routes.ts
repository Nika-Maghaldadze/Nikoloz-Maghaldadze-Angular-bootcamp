import { Routes } from '@angular/router';
import { QuizShellComponent } from './quiz-shell/quiz-shell';
import { QuizEngineStore } from './state/quiz-engine.store';

export const QUIZ_ROUTES: Routes = [
  {
    path: '',
    component: QuizShellComponent,
    providers: [QuizEngineStore],
  },
];
