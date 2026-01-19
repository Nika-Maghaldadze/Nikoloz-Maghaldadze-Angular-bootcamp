import { TestBed } from '@angular/core/testing';
import { GameControlsComponent } from './game-controls.component';
import { DragonRunnerStore } from '../../services/dragon-runner.store';
import { DragonRunnerEngineService } from '../../services/dragon-runner-engine.service';

describe('GameControlsComponent', () => {
  it('syncs model -> store via effect', async () => {
    await TestBed.configureTestingModule({
      imports: [GameControlsComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(GameControlsComponent);
    const cmp = fixture.componentInstance;
    const store = TestBed.inject(DragonRunnerStore);
    fixture.detectChanges();
    (cmp as any).model.set({ timerSec: 55, difficulty: 'hard' });
    fixture.detectChanges();
    expect(store.timerInputSec()).toBe(55);
    expect(store.difficulty()).toBe('hard');
  });

it('syncs store -> model via effect', () => {
  const store = TestBed.inject(DragonRunnerStore);
  const fixture = TestBed.createComponent(GameControlsComponent);
  fixture.detectChanges();
  store.timerInputSec.set(77);
  store.difficulty.set('easy');
  fixture.detectChanges();
  const cmp = fixture.componentInstance as any;
  const model = cmp.model();
  expect(model.timerSec).toBe(77);
  expect(model.difficulty).toBe('easy');
});


  it('exposes engine/store for template actions (sanity)', async () => {
    await TestBed.configureTestingModule({
      imports: [GameControlsComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(GameControlsComponent);
    const cmp = fixture.componentInstance;
    expect(cmp.engine).toBeInstanceOf(DragonRunnerEngineService);
    expect(cmp.store).toBeInstanceOf(DragonRunnerStore);
  });
});
