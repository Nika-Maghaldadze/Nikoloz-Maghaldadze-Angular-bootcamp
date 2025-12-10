import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AmountInputComponent } from './shared/controls/amount-input/amount-input.component';
import { AccountSelectComponent } from './shared/controls/account-select/account-select.component';
@NgModule({
  declarations: [
    AppComponent,
    AmountInputComponent,
    AccountSelectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

