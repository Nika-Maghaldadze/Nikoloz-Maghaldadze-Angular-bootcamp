import { Component } from '@angular/core';
import { DragonRunnerStore } from '../../services/dragon-runner.store';

@Component({
  selector: 'app-game-hud',
  standalone: false,
  templateUrl: './game-hud.component.html',
  styleUrl: './game-hud.component.scss',
})
export class GameHud {
  constructor(public readonly store: DragonRunnerStore) {}
}
