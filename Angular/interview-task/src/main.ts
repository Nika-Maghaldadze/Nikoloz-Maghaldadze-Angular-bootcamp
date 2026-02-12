import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app/app.routing';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
  ],
  template: `<router-outlet></router-outlet>`,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
