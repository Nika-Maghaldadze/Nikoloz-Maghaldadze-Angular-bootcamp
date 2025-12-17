import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragonRunner } from './components/dragon-runner/dragon-runner.component';

const routes: Routes = [{ path: '', component: DragonRunner }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DragonRunnerRoutingModule {}
