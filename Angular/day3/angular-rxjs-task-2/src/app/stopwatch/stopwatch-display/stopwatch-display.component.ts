import { Component, Input } from '@angular/core';
import { StopwatchSpeed } from '../../shared/models/stopwatch.model';
import { formatTimeMs } from '../../shared/utils/time-format';

@Component({
  selector: 'app-stopwatch-display',
  templateUrl: './stopwatch-display.component.html',
  styleUrls: ['./stopwatch-display.component.scss'],
})
export class StopwatchDisplayComponent {
  @Input() elapsedMs = 0;
  @Input() running = false;
  @Input() speed: StopwatchSpeed = 1;

  formatTime(value: number): string {
    return formatTimeMs(value);
  }
}
