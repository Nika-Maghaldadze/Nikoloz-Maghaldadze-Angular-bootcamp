import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DragonRunnerEngineService } from '../../services/dragon-runner-engine.service';
import { DragonRunnerStore } from '../../services/dragon-runner.store';

@Component({
  selector: 'app-game-stage',
  standalone: true,
  templateUrl: './game-stage.component.html',
  styleUrl: './game-stage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameStageComponent {
  constructor(
    public readonly store: DragonRunnerStore,
    public readonly engine: DragonRunnerEngineService
  ) {}
}
