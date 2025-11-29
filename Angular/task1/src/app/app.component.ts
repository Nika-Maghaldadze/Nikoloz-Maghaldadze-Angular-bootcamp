import { Component } from '@angular/core';
import { Data } from './data/data'; // <-- your real path here

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public buttons = new Data().buttons;

  public handleClick(variant: string, label: string): void {
    console.log(`${variant} → ${label} clicked`);
  }
}
