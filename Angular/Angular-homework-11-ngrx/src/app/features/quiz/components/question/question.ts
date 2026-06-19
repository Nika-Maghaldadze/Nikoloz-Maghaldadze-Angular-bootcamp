import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { QuizEngineStore } from '../../state/quiz-engine.store';

@Component({
  selector: 'app-question',
  standalone: true,
  templateUrl: './question.html',
  styleUrl: './question.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  readonly store = inject(QuizEngineStore);
}
