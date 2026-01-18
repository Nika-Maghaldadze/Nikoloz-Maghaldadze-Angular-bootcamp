import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DragonRunnerRoutingModule } from './dragon-runner-routing.module';
import { GameHud } from './components/game-hud/game-hud.component';
import { GameStage } from './components/game-stage/game-stage.component';
import { GameControls } from './components/game-controls/game-controls.component';
import { DragonRunner } from './components/dragon-runner/dragon-runner.component';

@NgModule({
  declarations: [
    DragonRunner,
    GameHud,
    GameStage,
    GameControls,
  ],
  imports: [
    SharedModule,
    DragonRunnerRoutingModule,
  ],
})
export class DragonRunnerModule {}
