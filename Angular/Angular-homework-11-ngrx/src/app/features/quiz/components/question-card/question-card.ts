import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnswerValue, Question } from '../../../../core/models/quiz.model';
import { ButtonComponent } from '../../../../shared/button/button';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './question-card.html',
  styleUrls: ['./question-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCardComponent implements OnChanges {
  @Input({ required: true }) question: Question | null = null;
  @Input() existingAnswer: AnswerValue | null = null;

  @Output() goBack = new EventEmitter<void>();
  @Output() submitAnswer = new EventEmitter<{ questionId: string; answer: AnswerValue }>();

  singleCtrl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  multiValue: string[] = [];

  ngOnChanges(): void {
    if (!this.question) return;

    if (this.question.type === 'single') {
      const v = typeof this.existingAnswer === 'string' ? this.existingAnswer : '';
      this.singleCtrl.setValue(v);
      this.singleCtrl.markAsPristine();
    } else {
      const v = Array.isArray(this.existingAnswer) ? this.existingAnswer : [];
      this.multiValue = [...v];
    }
  }

  toggleMulti(choiceId: string) {
    if (!this.question || this.question.type !== 'multiple') return;
    this.multiValue = this.multiValue.includes(choiceId)
      ? this.multiValue.filter((x) => x !== choiceId)
      : [...this.multiValue, choiceId];
  }

  get canSubmit(): boolean {
    if (!this.question) return false;
    if (this.question.type === 'single') return this.singleCtrl.valid;
    return this.multiValue.length > 0;
  }

  submit() {
    if (!this.question) return;

    if (this.question.type === 'single') {
      this.singleCtrl.markAsTouched();
      if (this.singleCtrl.invalid) return;
      this.submitAnswer.emit({ questionId: this.question.id, answer: this.singleCtrl.value });
      return;
    }

    if (this.multiValue.length === 0) return;
    this.submitAnswer.emit({ questionId: this.question.id, answer: [...this.multiValue] });
  }
}
