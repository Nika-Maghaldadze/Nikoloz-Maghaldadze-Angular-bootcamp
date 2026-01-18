import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormatTimePipe } from '../../../../shared/pipes/format-time.pipe';
import { DragonRunnerStore } from '../../services/dragon-runner.store';

@Component({
  selector: 'app-game-hud',
  standalone: true,
  imports: [FormatTimePipe],
  templateUrl: './game-hud.component.html',
  styleUrl: './game-hud.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameHudComponent {
  constructor(public readonly store: DragonRunnerStore) {}
}
