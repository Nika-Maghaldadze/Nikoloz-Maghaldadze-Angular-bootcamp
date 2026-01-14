import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'quiz' },
  {
    path: 'quiz',
    loadChildren: () => import('./features/quiz/quiz.routes').then((m) => m.QUIZ_ROUTES),
  },
  { path: '**', redirectTo: 'quiz' },
];
