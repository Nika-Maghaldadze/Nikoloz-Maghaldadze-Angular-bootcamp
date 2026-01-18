import { Injectable, computed, signal } from '@angular/core';
import {
  Difficulty,
  Dragon,
  GameConfig,
  GameStatus,
  Obstacle,
} from '../../../shared/models/game.model';

@Injectable({ providedIn: 'any' })
export class DragonRunnerStore {
  public timerInputSec = signal<number>(30);
  public difficulty = signal<Difficulty>('normal');
  public worldW = signal<number>(900);
  public worldH = signal<number>(280);
  public groundH = signal<number>(48);
  public status = signal<GameStatus>('ready');
  public config = signal<GameConfig>(this.makeConfig(this.timerInputSec(), this.difficulty()));
  public dragon = signal<Dragon>(this.makeDragon());
  public obstacles = signal<Obstacle[]>([]);
  public nextObstacleId = 1;
  public elapsedMs = signal<number>(0);
  public timeLeftMs = signal<number>(this.config().durationSec * 1000);
  public speed = signal<number>(this.config().baseSpeed);
  public score = signal<number>(0);
  public highScore = signal<number>(0);
  public obstaclesDodged = signal<number>(0);
  public scoreInt = computed(() => Math.floor(this.score()));
  public timeLeftSec = computed(() => Math.max(0, Math.ceil(this.timeLeftMs() / 1000)));
  public speedLabel = computed(() => `${this.speed().toFixed(1)} px/s`);
  public timeSurvivedSec = computed(() => (this.elapsedMs() / 1000).toFixed(2));

  public hud = computed(() => ({
    score: this.scoreInt(),
    highScore: this.highScore(),
    timeLeftMs: this.timeLeftMs(),
    timeLeftSec: this.timeLeftSec(),
    speed: this.speedLabel(),
    dodged: this.obstaclesDodged(),
  }));
  get isReady() {
    return this.status() === 'ready';
  }
  get isRunning() {
    return this.status() === 'running';
  }
  get isPaused() {
    return this.status() === 'paused';
  }
  get isOver() {
    return this.status() === 'over';
  }

  resetGame(): void {
    this.status.set('ready');
    this.dragon.set(this.makeDragon());
    this.obstacles.set([]);
    this.nextObstacleId = 1;
    this.elapsedMs.set(0);
    this.timeLeftMs.set(this.config().durationSec * 1000);
    this.speed.set(this.config().baseSpeed);
    this.score.set(0);
    this.obstaclesDodged.set(0);
  }

  rebuildConfig(): void {
    this.config.set(this.makeConfig(this.timerInputSec(), this.difficulty()));
    this.timeLeftMs.set(this.config().durationSec * 1000);
    this.speed.set(this.config().baseSpeed);
  }

  private makeConfig(durationSec: number, difficulty: Difficulty): GameConfig {
    const base: Omit<GameConfig, 'durationSec' | 'difficulty'> = {
      gravity: -2200,
      jumpVelocity: 900,
      baseSpeed: 320,
      speedRampPerSec: 18,
      spawnMinMs: 900,
      spawnMaxMs: 1600,
      scorePerSec: 20,
      distanceScoreFactor: 0.02,
      bonusPerObstacle: 15,
    };

    if (difficulty === 'easy') {
      return {
        durationSec,
        difficulty,
        ...base,
        baseSpeed: 280,
        speedRampPerSec: 12,
        spawnMinMs: 1100,
        spawnMaxMs: 1900,
        bonusPerObstacle: 12,
      };
    }
    if (difficulty === 'hard') {
      return {
        durationSec,
        difficulty,
        ...base,
        baseSpeed: 360,
        speedRampPerSec: 28,
        spawnMinMs: 650,
        spawnMaxMs: 1200,
        bonusPerObstacle: 20,
      };
    }
    return { durationSec, difficulty, ...base };
  }

  private makeDragon(): Dragon {
    return { x: 120, y: 0, w: 44, h: 44, vy: 0, isJumping: false, isDucking: false };
  }
}
