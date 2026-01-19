import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DragonRunnerComponent } from './components/dragon-runner/dragon-runner.component';

@Component({ selector: 'app-game-hud', standalone: true, template: '<div>HUD</div>' })
class HudStubComponent {}

@Component({ selector: 'app-game-stage', standalone: true, template: '<div>STAGE</div>' })
class StageStubComponent {}

@Component({ selector: 'app-game-controls', standalone: true, template: '<div>CONTROLS</div>' })
class ControlsStubComponent {}

describe('DragonRunner feature integration', () => {
  it('renders the feature shell (HUD + STAGE + CONTROLS)', async () => {
    await TestBed.configureTestingModule({
      imports: [DragonRunnerComponent],
    })
      .overrideComponent(DragonRunnerComponent, {
        set: {
          imports: [HudStubComponent, StageStubComponent, ControlsStubComponent],
        },
      })
      .compileComponents();

    const fixture = TestBed.createComponent(DragonRunnerComponent);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('HUD');
    expect(text).toContain('STAGE');
    expect(text).toContain('CONTROLS');
  });
});
