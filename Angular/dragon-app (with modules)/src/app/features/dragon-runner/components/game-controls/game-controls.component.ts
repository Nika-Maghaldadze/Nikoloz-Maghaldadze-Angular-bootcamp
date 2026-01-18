import { Component } from '@angular/core';
import { DragonRunnerStore } from '../../services/dragon-runner.store';
import { DragonRunnerEngineService } from '../../services/dragon-runner-engine.service';

@Component({
  selector: 'app-game-controls',
  standalone: false,
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})
export class GameControls {

  constructor(
    public readonly store: DragonRunnerStore,
    public readonly engine: DragonRunnerEngineService
  ){}

}
