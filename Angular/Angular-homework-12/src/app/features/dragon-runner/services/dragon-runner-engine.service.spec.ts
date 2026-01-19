import { TestBed } from '@angular/core/testing';
import { DragonRunnerEngineService } from './dragon-runner-engine.service';
import { DragonRunnerStore } from './dragon-runner.store';

describe('DragonRunnerEngineService coverage boosters', () => {
  let engine: DragonRunnerEngineService;
  let store: DragonRunnerStore;

  beforeEach(() => {
    engine = TestBed.inject(DragonRunnerEngineService);
    store = TestBed.inject(DragonRunnerStore);
  });

  it('start(): ready -> running', () => {
    store.status.set('ready');
    engine.start();
    expect(store.isRunning).toBe(true);
  });

  it('pause/resume: toggles status and stops/starts loop safely', () => {
    (globalThis as any).requestAnimationFrame = (cb: any) => 123 as any;
    (globalThis as any).cancelAnimationFrame = jest.fn();
    store.status.set('running');
    engine.pause();
    expect(store.isPaused).toBe(true);
    engine.resume();
    expect(store.isRunning).toBe(true);
  });

  it('jump(): sets vy and isJumping when running and not jumping', () => {
    store.status.set('running');
    store.dragon.set({ ...store.dragon(), isJumping: false, y: 0, vy: 0 });
    engine.jump();
    const d = store.dragon();
    expect(d.isJumping).toBe(true);
    expect(d.vy).not.toBe(0);
  });

  it('updateDragon(): lands back to y=0 and clears isJumping', () => {
    store.status.set('running');
    store.dragon.set({ ...store.dragon(), isJumping: true, y: 0.1, vy: -1 });
    (engine as any).updateDragon(1000);

    const d = store.dragon();
    expect(d.y).toBe(0);
    expect(d.vy).toBe(0);
    expect(d.isJumping).toBe(false);
  });

  it('updateObstacles(): marks passed and adds bonus/obstaclesDodged', () => {
    store.status.set('running');
    store.score.set(0);
    store.obstaclesDodged.set(0);
    const d = store.dragon();
    store.obstacles.set([{ id: 1, x: d.x - 100, y: 0, w: 10, h: 10, passed: false }]);
    store.speed.set(200);
    (engine as any).updateObstacles(16);
    expect(store.obstaclesDodged()).toBeGreaterThanOrEqual(1);
    expect(store.score()).toBeGreaterThan(0);
    expect(store.obstacles()[0].passed).toBe(true);
  });

  it('handleSpawning(): does nothing while countdown > 0', () => {
    store.obstacles.set([]);
    (engine as any).spawnCountdownMs = 100;
    (engine as any).handleSpawning(10);
    expect(store.obstacles().length).toBe(0);
  });

  it('spawnObstacle(): appends obstacle with unique id', () => {
    store.obstacles.set([]);
    const beforeId = (store as any).nextObstacleId;
    (engine as any).spawnObstacle();
    expect(store.obstacles().length).toBe(1);
    expect(store.obstacles()[0].id).toBe(beforeId);
  });

  it('checkCollision(): false when separated', () => {
    const d = store.dragon();
    store.obstacles.set([{ id: 1, x: d.x + 9999, y: 0, w: 10, h: 10, passed: false }]);
    expect((engine as any).checkCollision()).toBe(false);
  });

  it('update(): collision triggers gameOver', () => {
    store.status.set('running');
    store.timeLeftMs.set(99999);
    store.score.set(10.2);
    const d = store.dragon();
    store.obstacles.set([{ id: 1, x: d.x + 1, y: 0, w: 50, h: 50, passed: false }]);
    (engine as any).update(16);
    expect(store.isOver).toBe(true);
    expect(store.score()).toBe(10);
  });
});
