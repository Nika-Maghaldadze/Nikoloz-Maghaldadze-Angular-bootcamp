import { Injectable, effect } from '@angular/core';
import { DragonRunnerStore } from './dragon-runner.store';
import { StorageService } from '../../../core/services/storage.service';
import { Difficulty, Obstacle } from '../../../shared/models/game.model';

@Injectable({ providedIn: 'any' })
export class DragonRunnerEngineService {
  private readonly HIGH_SCORE_KEY = 'dragonRunnerHighScore';
  private readonly persistHighScore = true;
  private rafId: number | null = null;
  private lastTs = 0;
  private spawnCountdownMs = 0;
  private difficultyInitialized = false;
  private timerInitialized = false;

  constructor(public readonly store: DragonRunnerStore, private readonly storage: StorageService) {
    if (this.persistHighScore) {
      this.store.highScore.set(this.storage.getNumber(this.HIGH_SCORE_KEY, 0));
    }

    effect(() => {
      const v = this.store.timerInputSec();
      const safe = Math.max(5, Math.min(300, Math.floor(Number(v) || 30)));
      if (safe !== v) this.store.timerInputSec.set(safe);
    });

    effect(() => {
      this.store.timerInputSec();

      if (!this.timerInitialized) {
        this.timerInitialized = true;
        this.resetSpawnCountdown();
        return;
      }

      this.fullRestart();
    });

    effect(() => {
      if (!this.difficultyInitialized) {
        this.difficultyInitialized = true;
        return;
      }

      this.fullRestart();
    });

    effect(() => {
      if (!this.persistHighScore) return;
      this.storage.setNumber(this.HIGH_SCORE_KEY, this.store.highScore());
    });
  }

  startOrJump(): void {
    if (this.store.isReady) return this.start();
    if (this.store.isRunning) return this.jump();
    if (this.store.isOver) return this.fullRestart();
  }

  start(): void {
    if (this.store.isRunning) return;
    if (this.store.isPaused) return this.resume();
    if (this.store.isOver) return this.fullRestart();

    this.store.status.set('running');
    this.loopStart();
  }

  pauseOrResume(): void {
    if (this.store.isRunning) this.pause();
    else if (this.store.isPaused) this.resume();
  }

  pause(): void {
    if (!this.store.isRunning) return;
    this.store.status.set('paused');
    this.loopStop();
  }

  resume(): void {
    if (!this.store.isPaused) return;
    this.store.status.set('running');
    this.loopStart();
  }

  fullRestart(): void {
    this.loopStop();
    this.store.rebuildConfig();
    this.store.resetGame();
    this.resetSpawnCountdown();
  }

  jump(): void {
    if (!this.store.isRunning) return;
    const d = this.store.dragon();
    if (d.isJumping) return;

    this.store.dragon.set({
      ...d,
      isDucking: false,
      h: 44,
      y: 0,
      vy: this.store.config().jumpVelocity,
      isJumping: true,
    });
  }

  duck(pressed: boolean): void {
    if (!this.store.isRunning) return;
    const d = this.store.dragon();
    if (d.isJumping) return;

    if (pressed) {
      this.store.dragon.set({ ...d, isDucking: true, h: 26, y: -10 });
    } else {
      this.store.dragon.set({ ...d, isDucking: false, h: 44, y: 0 });
    }
  }

  onDifficultyChange(value: string): void {
    this.store.difficulty.set(value as Difficulty);
  }

  trackByObstacleId(_: number, o: Obstacle): number {
    return o.id;
  }

  private loopStart(): void {
    this.lastTs = performance.now();

    const step = (ts: number) => {
      if (!this.store.isRunning) return;
      const dt = Math.min(50, ts - this.lastTs);
      this.lastTs = ts;
      this.update(dt);
      this.rafId = requestAnimationFrame(step);
    };

    this.rafId = requestAnimationFrame(step);
  }

  private loopStop(): void {
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.lastTs = 0;
  }

  private update(dtMs: number): void {
    const cfg = this.store.config();
    const dtSec = dtMs / 1000;
    this.store.elapsedMs.update((v) => v + dtMs);
    this.store.timeLeftMs.update((v) => v - dtMs);

    if (this.store.timeLeftMs() <= 0) {
      this.gameOver();
      return;
    }
    this.store.speed.update((v) => v + cfg.speedRampPerSec * dtSec);
    this.store.score.update((v) => v + cfg.scorePerSec * dtSec);
    this.store.score.update((v) => v + this.store.speed() * dtSec * cfg.distanceScoreFactor);
    this.updateDragon(dtMs);
    this.handleSpawning(dtMs);
    this.updateObstacles(dtMs);

    if (this.checkCollision()) {
      this.gameOver();
      return;
    }
    const scoreInt = Math.floor(this.store.score());
    if (scoreInt > this.store.highScore()) {
      this.store.highScore.set(scoreInt);
    }
  }

  private gameOver(): void {
    this.store.status.set('over');
    this.loopStop();
    this.store.score.set(Math.floor(this.store.score()));
  }

  private resetSpawnCountdown(): void {
    const cfg = this.store.config();
    this.spawnCountdownMs = this.randomInt(cfg.spawnMinMs, cfg.spawnMaxMs);
  }

  private handleSpawning(dtMs: number): void {
    this.spawnCountdownMs -= dtMs;
    if (this.spawnCountdownMs > 0) return;
    this.spawnObstacle();
    this.resetSpawnCountdown();
  }

  private spawnObstacle(): void {
    const startX = this.store.worldW() + 20;
    const w = this.randomInt(18, 34);
    const h = this.randomInt(26, 60);

    this.store.obstacles.update((arr) => [
      ...arr,
      { id: this.store.nextObstacleId++, x: startX, y: 0, w, h, passed: false },
    ]);
  }

  private updateObstacles(dtMs: number): void {
    const cfg = this.store.config();
    const dtSec = dtMs / 1000;
    const speed = this.store.speed();
    const dragonX = this.store.dragon().x;

    let bonus = 0;
    let count = 0;

    const updated = this.store
      .obstacles()
      .map((o) => {
        const x = o.x - speed * dtSec;
        let passed = o.passed;
        if (!passed && x + o.w < dragonX) {
          passed = true;
          bonus += cfg.bonusPerObstacle;
          count += 1;
        }
        return { ...o, x, passed };
      })
      .filter((o) => o.x + o.w > -60);

    if (count) this.store.obstaclesDodged.update((v) => v + count);
    if (bonus) this.store.score.update((v) => v + bonus);
    this.store.obstacles.set(updated);
  }

  private updateDragon(dtMs: number): void {
    const cfg = this.store.config();
    const d = this.store.dragon();
    if (!d.isJumping) return;
    const dtSec = dtMs / 1000;
    let vy = d.vy + cfg.gravity * dtSec;
    let y = d.y + vy * dtSec;

    if (y <= 0) {
      y = 0;
      vy = 0;
      this.store.dragon.set({ ...d, y, vy, isJumping: false });
    } else {
      this.store.dragon.set({ ...d, y, vy });
    }
  }

  private checkCollision(): boolean {
    const d = this.store.dragon();
    const ground = this.store.groundH();
    const dLeft = d.x;
    const dRight = d.x + d.w;
    const dBottom = ground + d.y;
    const dTop = dBottom + d.h;

    for (const o of this.store.obstacles()) {
      const oLeft = o.x;
      const oRight = o.x + o.w;
      const oBottom = ground + o.y;
      const oTop = oBottom + o.h;
      const separated = dRight <= oLeft || dLeft >= oRight || dTop <= oBottom || dBottom >= oTop;

      if (!separated) return true;
    }
    return false;
  }
  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
