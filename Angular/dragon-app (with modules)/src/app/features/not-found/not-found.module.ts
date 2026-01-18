import { NgModule } from '@angular/core';
import { NotFound } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NotFound],
  imports: [SharedModule, NotFoundRoutingModule],
})
export class NotFoundModule {}
