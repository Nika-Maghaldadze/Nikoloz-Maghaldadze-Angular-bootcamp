import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet} from '@angular/router'
import { RouterModule } from '@angular/router';

// FIX:
// aq unda daematos routes
// services shi unda daematos iuzerebze samushao servisi HTTP da sxva
//

@Component({
  selector: 'app',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
