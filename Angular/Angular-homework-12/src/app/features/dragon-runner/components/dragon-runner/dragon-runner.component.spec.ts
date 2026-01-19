import { TestBed } from '@angular/core/testing';
import { DragonRunnerComponent } from './dragon-runner.component';
import { DragonRunnerEngineService } from '../../services/dragon-runner-engine.service';
import { DragonRunnerStore } from '../../services/dragon-runner.store';

describe('DragonRunnerComponent', () => {
  let component: DragonRunnerComponent;
  let engine: DragonRunnerEngineService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonRunnerComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(DragonRunnerComponent);
    component = fixture.componentInstance;
    engine = TestBed.inject(DragonRunnerEngineService);

    // We don't need real store behavior for key tests
    TestBed.inject(DragonRunnerStore);
  });

  it('Space/ArrowUp calls startOrJump and prevents default', () => {
    const spy = jest.spyOn(engine, 'startOrJump').mockImplementation(() => {});
    const ev = { code: 'Space', preventDefault: jest.fn() } as any as KeyboardEvent;

    component.handleKeyDown(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('ArrowDown keydown calls duck(true) and prevents default', () => {
    const spy = jest.spyOn(engine, 'duck').mockImplementation(() => {});
    const ev = { code: 'ArrowDown', preventDefault: jest.fn() } as any as KeyboardEvent;

    component.handleKeyDown(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(true);

    spy.mockRestore();
  });

  it('ArrowDown keyup calls duck(false)', () => {
    const spy = jest.spyOn(engine, 'duck').mockImplementation(() => {});
    const ev = { code: 'ArrowDown' } as any as KeyboardEvent;

    component.handleKeyUp(ev);

    expect(spy).toHaveBeenCalledWith(false);
    spy.mockRestore();
  });

  it('KeyP calls pauseOrResume', () => {
    const spy = jest.spyOn(engine, 'pauseOrResume').mockImplementation(() => {});
    const ev = { code: 'KeyP', preventDefault: jest.fn() } as any as KeyboardEvent;

    component.handleKeyDown(ev);

    expect(spy).toHaveBeenCalledTimes(1);
    // KeyP should not preventDefault in your code
    expect(ev.preventDefault).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it('KeyR calls fullRestart', () => {
    const spy = jest.spyOn(engine, 'fullRestart').mockImplementation(() => {});
    const ev = { code: 'KeyR', preventDefault: jest.fn() } as any as KeyboardEvent;

    component.handleKeyDown(ev);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(ev.preventDefault).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it('other keys do nothing', () => {
    const s1 = jest.spyOn(engine, 'startOrJump').mockImplementation(() => {});
    const s2 = jest.spyOn(engine, 'duck').mockImplementation(() => {});
    const s3 = jest.spyOn(engine, 'pauseOrResume').mockImplementation(() => {});
    const s4 = jest.spyOn(engine, 'fullRestart').mockImplementation(() => {});

    const ev = { code: 'KeyX', preventDefault: jest.fn() } as any as KeyboardEvent;
    component.handleKeyDown(ev);
    component.handleKeyUp(ev);

    expect(ev.preventDefault).not.toHaveBeenCalled();
    expect(s1).not.toHaveBeenCalled();
    expect(s2).not.toHaveBeenCalled();
    expect(s3).not.toHaveBeenCalled();
    expect(s4).not.toHaveBeenCalled();
  });
});
