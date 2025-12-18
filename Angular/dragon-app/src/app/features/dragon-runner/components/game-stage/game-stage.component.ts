import { Component } from '@angular/core';
import { DragonRunnerStore } from '../../services/dragon-runner.store';
import { DragonRunnerEngineService } from '../../services/dragon-runner-engine.service';

@Component({
  selector: 'app-game-stage',
  standalone: false,
  templateUrl: './game-stage.component.html',
  styleUrl: './game-stage.component.scss',
})
export class GameStage {
  constructor(
    public readonly store: DragonRunnerStore,
    public readonly engine: DragonRunnerEngineService
  ) {}
}
