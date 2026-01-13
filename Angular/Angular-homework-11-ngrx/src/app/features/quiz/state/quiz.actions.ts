import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AnswerValue, Question, User } from '../../../core/models/quiz.model';

export const QuizActions = createActionGroup({
  source: 'Quiz',
  events: {
    Init: emptyProps(),

    'Load Questions Success': props<{ questions: Question[] }>(),
    'Load Questions Failure': props<{ error: string }>(),

    'Hydrate From Storage': props<{ user: User | null; answers: Record<string, AnswerValue>; stepIndex: number }>(),

    'Set User': props<{ user: User }>(),
    'Answer Question': props<{ questionId: string; answer: AnswerValue }>(),

    'Next Step': emptyProps(),
    'Prev Step': emptyProps(),
    Restart: emptyProps(),
  },
});
