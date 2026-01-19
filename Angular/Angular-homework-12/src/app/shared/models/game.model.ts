export type GameStatus = 'ready' | 'running' | 'paused' | 'over';
export type Difficulty = 'easy' | 'normal' | 'hard';

export interface Dragon {
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
  isJumping: boolean;
  isDucking: boolean;
}

export interface Obstacle {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  passed: boolean;
}

export interface GameConfig {
  durationSec: number;
  difficulty: Difficulty;
  gravity: number;
  jumpVelocity: number;
  baseSpeed: number;
  speedRampPerSec: number;
  spawnMinMs: number;
  spawnMaxMs: number;
  scorePerSec: number;
  distanceScoreFactor: number;
  bonusPerObstacle: number;
}
