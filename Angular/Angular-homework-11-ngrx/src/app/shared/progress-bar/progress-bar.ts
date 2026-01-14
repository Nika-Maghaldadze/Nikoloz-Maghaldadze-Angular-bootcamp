import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  value = input<number>(0);

  clamped = computed(() => {
    const v = Number(this.value() ?? 0);
    return Math.max(0, Math.min(100, v));
  });
}
