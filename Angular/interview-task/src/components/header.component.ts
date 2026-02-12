import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatToolbarModule],
  template: `
      <h3>{{pageTitle}}</h3>
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
export class HeaderComponent {
  @Input() pageTitle = '';
}
