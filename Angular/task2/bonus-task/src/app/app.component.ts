import { Component } from '@angular/core';
import { registrationFormConfig } from './registration-form/form-config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  config = registrationFormConfig;
}
