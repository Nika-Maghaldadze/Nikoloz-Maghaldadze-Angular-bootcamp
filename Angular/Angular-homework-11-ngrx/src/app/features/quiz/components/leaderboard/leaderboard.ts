import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { QuizEngineStore } from '../../state/quiz-engine.store';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaderboardComponent implements OnInit {
  readonly store = inject(QuizEngineStore);

  ngOnInit(): void {
    this.store.loadLeaderboard();
  }
}
