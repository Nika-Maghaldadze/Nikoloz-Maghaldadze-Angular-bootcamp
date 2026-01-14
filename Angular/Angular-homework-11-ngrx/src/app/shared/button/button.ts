import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type ButtonVariant = 'primary' | 'ghost' | 'default';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('default');
  disabled = input<boolean>(false);
  type = input<ButtonType>('button');

  isPrimary = computed(() => this.variant() === 'primary');
  isGhost = computed(() => this.variant() === 'ghost');
}
