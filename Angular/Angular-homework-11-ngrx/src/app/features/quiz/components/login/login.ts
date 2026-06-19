import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { QuizEngineStore } from '../../state/quiz-engine.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly store = inject(QuizEngineStore);
  readonly auth = inject(AuthService);

  readonly name = signal('');
  readonly email = signal('');
  readonly touched = signal(false);

  readonly nameError = computed(() => (this.name().trim() ? null : 'სახელი სავალდებულოა.'));
  readonly emailError = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim()) ? null : 'შეიყვანე სწორი ელ. ფოსტა.'
  );
  readonly isValid = computed(() => !this.nameError() && !this.emailError());

  submit(): void {
    this.touched.set(true);
    if (!this.isValid()) return;

    this.auth.login(this.name().trim(), this.email().trim()).subscribe({
      next: () => this.store.completeLogin(),
      error: () => {
        /* message surfaced via auth.error() */
      },
    });
  }
}
