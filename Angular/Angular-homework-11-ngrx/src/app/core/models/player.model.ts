/** A leaderboard participant, persisted via json-server (`/players`). */
export interface Player {
  id?: string;
  name: string;
  email: string;
  /** Highest score achieved (0–100). */
  bestScore: number;
  /** Total quiz time for the best run, in ms (faster breaks ties). */
  bestTimeMs: number;
  /** ISO timestamp of the most recent attempt, or null if never played. */
  lastPlayedAt: string | null;
}

/** The mutable stats written back after finishing a run. */
export type PlayerResult = Pick<Player, 'bestScore' | 'bestTimeMs' | 'lastPlayedAt'>;
