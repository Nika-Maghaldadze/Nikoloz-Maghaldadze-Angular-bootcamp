import { Component, HostListener } from '@angular/core';
import { DragonRunnerStore } from '../../services/dragon-runner.store';
import { DragonRunnerEngineService } from '../../services/dragon-runner-engine.service';

@Component({
  selector: 'app-dragon-runner',
  standalone: false,
  templateUrl: './dragon-runner.component.html',
  styleUrl: './dragon-runner.component.scss',
})
export class DragonRunner {
  constructor(
    public readonly store: DragonRunnerStore,
    public readonly engine: DragonRunnerEngineService
  ) {
    
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
      case 'ArrowUp':
        event.preventDefault();
        this.engine.startOrJump();
        break;

      case 'ArrowDown':
        event.preventDefault();
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
