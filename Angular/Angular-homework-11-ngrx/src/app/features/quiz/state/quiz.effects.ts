import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  map,
  of,
  OperatorFunction,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

import { QuizService } from '../../../core/services/quiz.service';
import { StorageService } from '../../../core/services/storage.service';
import { QuizProgress } from '../../../core/models/quiz.model';
import { QuizActions } from './quiz.actions';
import { selectProgress } from './quiz.selectors';

const PROGRESS_KEY = 'quiz.progress';

@Injectable()
export class QuizEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private api = inject(QuizService);
  private storage = inject(StorageService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.init),
      switchMap(() =>
        this.api.getQuestions().pipe(
          map((questions) => QuizActions.loadQuestionsSuccess({ questions })),
          catchError((e) => of(QuizActions.loadQuestionsFailure({ error: toMessage(e) })))
        )
      )
    )
  );

  // On startup, restore any saved progress so a page reload resumes the quiz.
  hydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.init),
      map(() => this.storage.readJson<QuizProgress>(PROGRESS_KEY)),
      filterNotNull(),
      map((progress) => QuizActions.hydrate({ progress }))
    )
  );

  // Mirror progress to storage whenever it changes.
  persist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          QuizActions.setUser,
          QuizActions.answerQuestion,
          QuizActions.nextStep,
          QuizActions.prevStep
        ),
        withLatestFrom(this.store.select(selectProgress)),
        tap(([, progress]) => this.storage.writeJson(PROGRESS_KEY, progress))
      ),
    { dispatch: false }
  );

  // Clear persisted progress on restart.
  clearOnRestart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(QuizActions.restart),
        tap(() => this.storage.remove(PROGRESS_KEY))
      ),
    { dispatch: false }
  );
}

function toMessage(e: unknown): string {
  if (e instanceof HttpErrorResponse) {
    return e.status ? `${e.status} ${e.statusText}` : e.message;
  }
  return e instanceof Error ? e.message : 'Unknown error';
}

// Small typed filter for "drop nulls" so the stream narrows to T.
function filterNotNull<T>(): OperatorFunction<T | null, T> {
  return filter((v): v is T => v !== null);
}
