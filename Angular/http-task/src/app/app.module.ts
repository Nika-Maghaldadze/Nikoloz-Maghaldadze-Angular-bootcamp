import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { TransferComponent } from "./features/transfer/transfer.component";
import { AmountInputComponent } from "./shared/controls/amount-input/amount-input.component";
import { AccountSelectComponent } from "./shared/controls/account-select/account-select.component";
import { NotFoundComponent } from './features/not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        TransferComponent,
        AmountInputComponent,
        AccountSelectComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
