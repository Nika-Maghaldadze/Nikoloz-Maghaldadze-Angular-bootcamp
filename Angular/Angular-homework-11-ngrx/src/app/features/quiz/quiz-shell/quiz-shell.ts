import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { QuizEngineStore } from '../state/quiz-engine.store';
import { AuthService } from '../../../core/services/auth.service';
import { LoginComponent } from '../components/login/login';
import { HomeComponent } from '../components/home/home';
import { QuestionComponent } from '../components/question/question';
import { ResultsComponent } from '../components/results/results';
import { ReviewComponent } from '../components/review/review';
import { LeaderboardComponent } from '../components/leaderboard/leaderboard';

@Component({
  selector: 'app-quiz-shell',
  standalone: true,
  imports: [
    LoginComponent,
    HomeComponent,
    QuestionComponent,
    ResultsComponent,
    ReviewComponent,
    LeaderboardComponent,
  ],
  templateUrl: './quiz-shell.html',
  styleUrl: './quiz-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizShellComponent implements OnInit {
  readonly store = inject(QuizEngineStore);
  readonly auth = inject(AuthService);

  ngOnInit(): void {
    this.store.load();
  }

  logout(): void {
    this.auth.logout();
    this.store.go('home');
  }
}
