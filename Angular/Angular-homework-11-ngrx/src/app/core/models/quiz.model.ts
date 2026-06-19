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

export type Screen = 'login' | 'home' | 'quiz' | 'results' | 'review' | 'leaderboard';

export type Accent = '#1F1E1B' | '#3B5C45' | '#2E3F6E' | '#6E2F39';
