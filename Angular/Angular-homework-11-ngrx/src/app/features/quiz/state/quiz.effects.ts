import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { QuizService } from '../../../core/services/quiz.service';
import { QuizActions } from './quiz.actions';

@Injectable()
export class QuizEffects {
  private actions$ = inject(Actions);
  private api = inject(QuizService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.init),
      switchMap(() =>
        this.api.getQuestions().pipe(
          map((questions) => QuizActions.loadQuestionsSuccess({ questions })),
          catchError((e) => of(QuizActions.loadQuestionsFailure({ error: String(e) })))
        )
      )
    )
  );
}
