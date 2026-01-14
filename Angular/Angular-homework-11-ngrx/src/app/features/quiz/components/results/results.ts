import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button';
import { User } from '../../../../core/models/quiz.model';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {
  user = input<User | null>(null);
  score = input<number>(0);
  restart = output<void>();
}
