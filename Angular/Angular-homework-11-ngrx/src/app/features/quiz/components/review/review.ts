import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { QuizEngineStore } from '../../state/quiz-engine.store';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.html',
  styleUrl: './review.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {
  readonly store = inject(QuizEngineStore);
}
