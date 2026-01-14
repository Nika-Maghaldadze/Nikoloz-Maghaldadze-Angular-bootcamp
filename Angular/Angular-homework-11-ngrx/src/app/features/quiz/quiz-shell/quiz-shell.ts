import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';

import { QuizActions } from '../state/quiz.actions';
import {
  selectCurrentAnswer,
  selectCurrentQuestion,
  selectError,
  selectLoading,
  selectProgressPercent,
  selectTotalScore,
  selectUser,
  selectView,
} from '../state/quiz.selectors';

import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar';
import { IntroComponent } from '../components/intro/intro';
import { QuestionCardComponent } from '../components/question-card/question-card';
import { ResultsComponent } from '../components/results/results';
import { AnswerValue, User } from '../../../core/models/quiz.model';

@Component({
  selector: 'app-quiz-shell',
  standalone: true,
  imports: [
    AsyncPipe,
    ProgressBarComponent,
    IntroComponent,
    QuestionCardComponent,
    ResultsComponent,
  ],
  templateUrl: './quiz-shell.html',
  styleUrl: './quiz-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizShellComponent implements OnInit {
  private readonly store = inject(Store);

  view$ = this.store.select(selectView);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  user$ = this.store.select(selectUser);
  currentQuestion$ = this.store.select(selectCurrentQuestion);
  currentAnswer$ = this.store.select(selectCurrentAnswer);

  progress$ = this.store.select(selectProgressPercent).pipe(
    startWith(0),
    map((v) => v ?? 0)
  );

  score$ = this.store.select(selectTotalScore);

  ngOnInit(): void {
    this.store.dispatch(QuizActions.init());
  }

  onUserSubmit(user: User) {
    this.store.dispatch(QuizActions.setUser({ user }));
    this.store.dispatch(QuizActions.nextStep());
  }

  onAnswer(payload: { questionId: string; answer: AnswerValue }) {
    this.store.dispatch(QuizActions.answerQuestion(payload));
    this.store.dispatch(QuizActions.nextStep());
  }

  onPrev() {
    this.store.dispatch(QuizActions.prevStep());
  }

  onRestart() {
    this.store.dispatch(QuizActions.restart());
  }
}
