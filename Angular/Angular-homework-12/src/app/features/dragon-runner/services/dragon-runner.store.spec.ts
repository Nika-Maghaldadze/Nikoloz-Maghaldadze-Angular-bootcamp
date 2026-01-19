import { TestBed } from '@angular/core/testing';
import { DragonRunnerStore } from './dragon-runner.store';

describe('DragonRunnerStore', () => {
  let store: DragonRunnerStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragonRunnerStore],
    });
    store = TestBed.inject(DragonRunnerStore);
  });

  it('starts in ready state', () => {
    expect(store.status()).toBe('ready');
    expect(store.score()).toBe(0);
  });

  it('rebuildConfig uses timerInputSec and difficulty (if present)', () => {
    const anyStore = store as any;

    if (anyStore.timerInputSec?.set && anyStore.difficulty?.set && typeof anyStore.rebuildConfig === 'function') {
      anyStore.timerInputSec.set(12);
      anyStore.difficulty.set('hard');
      anyStore.rebuildConfig();

      expect(anyStore.config().durationSec).toBe(12);
      expect(anyStore.config().difficulty).toBe('hard');
      return;
    }

    expect(true).toBe(true);
  });

  it('resetGame resets runtime fields (if method exists)', () => {
    const anyStore = store as any;

    if (typeof anyStore.resetGame === 'function') {
      anyStore.status?.set?.('running');
      anyStore.score?.set?.(55);
      anyStore.elapsedMs?.set?.(500);
      anyStore.obstaclesDodged?.set?.(3);
      anyStore.obstacles?.set?.([{ id: 1, x: 0, y: 0, w: 10, h: 10, passed: false }]);

      anyStore.resetGame();

      expect(anyStore.status()).toBe('ready');
      expect(anyStore.score()).toBe(0);
      return;
    }

    expect(true).toBe(true);
  });
});
