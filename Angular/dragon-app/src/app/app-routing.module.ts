import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dragon-runner', pathMatch: 'full' },
  {
    path: 'dragon-runner',
    loadChildren: () =>
      import('./features/dragon-runner/dragon-runner.module').then(m => m.DragonRunnerModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(m => m.NotFoundModule),
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
