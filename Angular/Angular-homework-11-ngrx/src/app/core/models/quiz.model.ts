export type QuestionType = 'single' | 'multiple';

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  choices: Choice[];
  points: number;
}

export interface User {
  name: string;
  email: string;
}

export type AnswerValue = string | string[];

export type QuizView = 'INTRO' | 'QUESTION' | 'RESULTS';

/** The slice of quiz state worth persisting/restoring across reloads. */
export interface QuizProgress {
  user: User | null;
  answers: Record<string, AnswerValue>;
  step: number;
}
