import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, mergeMap, of, tap, withLatestFrom } from 'rxjs';

import { QuizService } from '../../../core/services/quiz.service';
import { StorageService } from '../../../core/services/storage.service';
import { QuizActions } from './quiz.actions';
import { selectAnswers, selectStepIndex, selectUser } from './quiz.selectors';
import { AnswerValue, User } from '../../../core/models/quiz.model';

type Persisted = {
  user: User | null;
  answers: Record<string, AnswerValue>;
  stepIndex: number;
};

const STORAGE_KEY = 'quiz_app_state_v1';

@Injectable()
export class QuizEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly quizService = inject(QuizService);
  private readonly storage = inject(StorageService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuizActions.init),
      mergeMap(() => {
        const persisted = this.storage.readJson<Persisted>(STORAGE_KEY);

        return this.quizService.getQuestions().pipe(
          mergeMap((questions) => {
            const loadAction = QuizActions.loadQuestionsSuccess({ questions });

            if (!persisted) return of(loadAction);

            const hydrateAction = QuizActions.hydrateFromStorage({
              user: persisted.user ?? null,
              answers: persisted.answers ?? {},
              stepIndex: Number.isFinite(persisted.stepIndex) ? persisted.stepIndex : 0,
            });
            return of(loadAction, hydrateAction);
          }),
          catchError((e) =>
            of(QuizActions.loadQuestionsFailure({ error: String(e ?? 'Load failed') }))
          )
        );
      })
    )
  );

  persist$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          QuizActions.setUser,
          QuizActions.answerQuestion,
          QuizActions.nextStep,
          QuizActions.prevStep,
          QuizActions.restart
        ),
        withLatestFrom(
          this.store.select(selectUser),
          this.store.select(selectAnswers),
          this.store.select(selectStepIndex)
        ),
        tap(([, user, answers, stepIndex]) => {
          const payload: Persisted = { user, answers, stepIndex };
          this.storage.writeJson(STORAGE_KEY, payload);
        })
      ),
    { dispatch: false }
  );
}
