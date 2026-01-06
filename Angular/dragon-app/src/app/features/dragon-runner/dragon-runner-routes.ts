import { Routes } from '@angular/router';
import { DragonRunnerComponent } from './components/dragon-runner/dragon-runner.component';
import { DragonRunnerStore } from './services/dragon-runner.store';
import { DragonRunnerEngineService } from './services/dragon-runner-engine.service';

export const DRAGON_RUNNER_ROUTES: Routes = [
  {
    path: '',
    component: DragonRunnerComponent,
    providers: [DragonRunnerStore, DragonRunnerEngineService],
  },
];
