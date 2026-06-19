import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { QuizEngineStore } from '../../state/quiz-engine.store';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly store = inject(QuizEngineStore);

  readonly qCount = computed(() => this.store.total());
  readonly maxPoints = computed(
    () => this.store.total() * (this.store.questions()[0]?.points ?? 10)
  );
}
