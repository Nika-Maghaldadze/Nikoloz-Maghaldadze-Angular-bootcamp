import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button';
import { User } from '../../../../core/models/quiz.model';

const COUNT_UP_MS = 600;

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {
  user = input<User | null>(null);
  score = input<number>(0);
  restart = output<void>();

  /** Score shown on screen — animates up from 0 to `score()`. */
  displayScore = signal(0);

  private destroyRef = inject(DestroyRef);

  constructor() {
    effect((onCleanup) => {
      const target = this.score();

      const reduceMotion =
        typeof matchMedia !== 'undefined' &&
        matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion || target <= 0) {
        this.displayScore.set(target);
        return;
      }

      const start = performance.now();
      let frame = 0;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / COUNT_UP_MS);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        this.displayScore.set(Math.round(target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);

      const cancel = () => cancelAnimationFrame(frame);
      onCleanup(cancel);
      this.destroyRef.onDestroy(cancel);
    });
  }
}
