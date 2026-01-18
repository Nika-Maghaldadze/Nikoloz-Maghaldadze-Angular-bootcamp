import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { App } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [App],
})
export class AppModule {}
