import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../core/models/quiz.model';
import { ButtonComponent } from '../../../../shared/button/button';

type IntroErrors = { name?: string; email?: string };

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './intro.html',
  styleUrl: './intro.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {
  savedUser = input<User | null>(null);
  submitUser = output<User>();

  name = signal('');
  email = signal('');
  touchedName = signal(false);
  touchedEmail = signal(false);

  constructor() {
    effect(() => {
      const u = this.savedUser();
      if (!u) return;

      this.name.set(u.name ?? '');
      this.email.set(u.email ?? '');
      this.touchedName.set(false);
      this.touchedEmail.set(false);
    });
  }

  errors = computed<IntroErrors>(() => {
    const n = this.name().trim();
    const e = this.email().trim();

    const out: IntroErrors = {};
    if (!n) out.name = 'Name is required.';
    if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      out.email = 'Valid email required.';
    }
    return out;
  });

  isValid = computed(() => Object.keys(this.errors()).length === 0);

  setName(v: string) {
    this.name.set(v);
    this.touchedName.set(true);
  }

  setEmail(v: string) {
    this.email.set(v);
    this.touchedEmail.set(true);
  }

  submit() {
    this.touchedName.set(true);
    this.touchedEmail.set(true);
    if (!this.isValid()) return;

    this.submitUser.emit({
      name: this.name().trim(),
      email: this.email().trim(),
    });
  }
}
