export interface Player {
  id?: string;
  name: string;
  email: string;
  bestScore: number;
  bestTimeMs: number;
  lastPlayedAt: string | null;
}

export type PlayerResult = Pick<Player, 'bestScore' | 'bestTimeMs' | 'lastPlayedAt'>;
