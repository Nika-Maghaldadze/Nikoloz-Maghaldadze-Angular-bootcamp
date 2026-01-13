import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() value = 0;
  get clamped(): number {
    return Math.max(0, Math.min(100, this.value));
  }
}
