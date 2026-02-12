import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header.component';

@Component({
  standalone: true,
  selector: 'app-Home',
  imports: [MatToolbarModule, HeaderComponent],
  template: `
    <app-header [pageTitle]="'Home Page'"></app-header>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      mat-toolbar {
        /* additional styling if desired */
      }
    `,
  ],
})
export class HomeComponent {}
