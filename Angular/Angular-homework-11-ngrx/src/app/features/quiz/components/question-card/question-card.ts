import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

import { AnswerValue, Question } from '../../../../core/models/quiz.model';
import { ButtonComponent } from '../../../../shared/button/button';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCardComponent {
  question = input<Question | null>(null);
  existingAnswer = input<AnswerValue | null>(null);
  goBack = output<void>();
  submitAnswer = output<{ questionId: string; answer: AnswerValue }>();

  private single = signal<string | null>(null);
  private multi = signal<string[]>([]);

  singleValue = computed(() => this.single());
  multiValue = computed(() => this.multi());

  canSubmit = computed(() => {
    const q = this.question();
    if (!q) return false;

    if (q.type === 'single') return !!this.single();
    return this.multi().length > 0;
  });

  constructor() {
    effect(() => {
      const q = this.question();
      const a = this.existingAnswer();
      if (!q) return;

      if (q.type === 'single') {
        this.single.set(typeof a === 'string' ? a : null);
        this.multi.set([]);
      } else {
        this.multi.set(Array.isArray(a) ? [...a] : []);
        this.single.set(null);
      }
    });
  }

  setSingle(id: string) {
    this.single.set(id);
  }

  toggleMulti(id: string) {
    const current = this.multi();
    this.multi.set(current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }

  submit() {
    const q = this.question();
    if (!q) return;

    if (q.type === 'single') {
      const v = this.single();
      if (!v) return;
      this.submitAnswer.emit({ questionId: q.id, answer: v });
      return;
    }

    const v = this.multi();
    if (!v.length) return;
    this.submitAnswer.emit({ questionId: q.id, answer: [...v] });
  }
}
