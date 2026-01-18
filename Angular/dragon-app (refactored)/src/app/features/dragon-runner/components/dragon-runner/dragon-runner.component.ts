import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { GameControlsComponent } from '../game-controls/game-controls.component';
import { GameHudComponent } from '../game-hud/game-hud.component';
import { GameStageComponent } from '../game-stage/game-stage.component';
import { DragonRunnerEngineService } from '../../services/dragon-runner-engine.service';
import { DragonRunnerStore } from '../../services/dragon-runner.store';

@Component({
  selector: 'app-dragon-runner',
  standalone: true,
  imports: [GameHudComponent, GameStageComponent, GameControlsComponent],
  templateUrl: './dragon-runner.component.html',
  styleUrl: './dragon-runner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragonRunnerComponent {
  constructor(
    public readonly store: DragonRunnerStore,
    public readonly engine: DragonRunnerEngineService
  ) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      event.preventDefault();
    }
    switch (event.code) {
      case 'Space':
      case 'ArrowUp':
        this.engine.startOrJump();
        break;

      case 'ArrowDown':
        this.engine.duck(true);
        break;

      case 'KeyP':
        this.engine.pauseOrResume();
        break;

      case 'KeyR':
        this.engine.fullRestart();
        break;
    }
  }
  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent): void {
    if (event.code === 'ArrowDown') {
      this.engine.duck(false);
    }
  }
}
