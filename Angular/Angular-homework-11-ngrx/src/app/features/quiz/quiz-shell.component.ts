import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-quiz-shell',
  standalone: true,
  template: `
    <div style="padding:24px">
      <h1>Quiz</h1>
      <p>Shell works.</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizShellComponent {}
