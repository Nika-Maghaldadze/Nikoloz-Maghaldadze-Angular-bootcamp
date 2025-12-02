import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BookingFormComponent } from "./booking-form/booking-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [AppComponent, BookingFormComponent],
    imports: [BrowserModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
