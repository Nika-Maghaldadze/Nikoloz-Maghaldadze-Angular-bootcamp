import { Routes } from '@angular/router';
import { QuizShellComponent } from './quiz-shell/quiz-shell';
import { provideQuizFeature } from './state/quiz.feature';

export const QUIZ_ROUTES: Routes = [
  {
    path: '',
    component: QuizShellComponent,
    providers: [provideQuizFeature()],
  },
];
