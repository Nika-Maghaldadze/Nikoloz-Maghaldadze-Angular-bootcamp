import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../../core/models/quiz.model';

type IntroErrors = {
  name?: string;
  email?: string;
};

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './intro.html',
  styleUrls: ['./intro.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {
  @Input() set savedUser(v: User | null) {
    if (!v) return;
    this.name.set(v.name ?? '');
    this.email.set(v.email ?? '');
    this.touchedName.set(false);
    this.touchedEmail.set(false);
  }

  @Output() submitUser = new EventEmitter<User>();
  readonly name = signal<string>('');
  readonly email = signal<string>('');
  readonly touchedName = signal(false);
  readonly touchedEmail = signal(false);
  readonly errors = computed<IntroErrors>(() => {
    const name = this.name().trim();
    const email = this.email().trim();
    const e: IntroErrors = {};
    if (!name) e.name = 'Name is required.';
    if (!email) e.email = 'Valid email required.';
    else if (!this.isEmail(email)) e.email = 'Valid email required.';

    return e;
  });

  readonly isValid = computed(() => Object.keys(this.errors()).length === 0);

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

  private isEmail(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
}
