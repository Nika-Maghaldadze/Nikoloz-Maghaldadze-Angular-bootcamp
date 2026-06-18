import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AnswerValue, Question, QuizProgress, User } from '../../../core/models/quiz.model';

export const QuizActions = createActionGroup({
  source: 'Quiz',
  events: {
    Init: emptyProps(),
    Hydrate: props<{ progress: QuizProgress }>(),
    'Load Questions Success': props<{ questions: Question[] }>(),
    'Load Questions Failure': props<{ error: string }>(),
    'Set User': props<{ user: User }>(),
    'Answer Question': props<{ questionId: string; answer: AnswerValue }>(),
    'Next Step': emptyProps(),
    'Prev Step': emptyProps(),
    Restart: emptyProps(),
  },
});
