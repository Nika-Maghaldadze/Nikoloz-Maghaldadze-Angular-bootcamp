import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';

import { form, FormField } from '@angular/forms/signals';

import { Difficulty } from '../../../../shared/models/game.model';
import { DragonRunnerEngineService } from '../../services/dragon-runner-engine.service';
import { DragonRunnerStore } from '../../services/dragon-runner.store';

interface ControlsModel {
  timerSec: number;
  difficulty: Difficulty;
}

@Component({
  selector: 'app-game-controls',
  standalone: true,
  imports: [FormField],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameControlsComponent {
  readonly store = inject(DragonRunnerStore);
  readonly engine = inject(DragonRunnerEngineService);

  // internal view model
  private readonly model = signal<ControlsModel>({
    timerSec: this.store.timerInputSec(),
    difficulty: this.store.difficulty(),
  });

  readonly controlsForm = form(this.model);

  constructor() {
    effect(() => {
      const m = this.model();
      const timer = untracked(() => this.store.timerInputSec());
      const diff = untracked(() => this.store.difficulty());
      if (m.timerSec !== timer) this.store.timerInputSec.set(m.timerSec);
      if (m.difficulty !== diff) this.store.difficulty.set(m.difficulty);
    });
    effect(() => {
      const timerSec = this.store.timerInputSec();
      const difficulty = this.store.difficulty();
      const m = this.model();

      if (m.timerSec !== timerSec || m.difficulty !== difficulty) {
        this.model.set({ timerSec, difficulty });
      }
    });
  }
}
