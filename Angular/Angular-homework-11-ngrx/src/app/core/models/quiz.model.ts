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
