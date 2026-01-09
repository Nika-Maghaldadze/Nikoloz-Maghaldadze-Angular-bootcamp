import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dragon-runner' },

  {
    path: 'dragon-runner',
    loadChildren: () =>
      import('./features/dragon-runner/dragon-runner-routes').then((m) => m.DRAGON_RUNNER_ROUTES),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
