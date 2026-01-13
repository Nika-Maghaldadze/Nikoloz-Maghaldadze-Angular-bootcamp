import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent  {
  @Input() variant: 'primary' | 'ghost' | 'default' = 'default';
  @Input() disabled = false;
}
