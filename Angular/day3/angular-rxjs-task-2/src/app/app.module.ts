import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { StopwatchContainerComponent } from "./stopwatch/stopwatch-container/stopwatch-container.component";
import { StopwatchDisplayComponent } from "./stopwatch/stopwatch-display/stopwatch-display.component";
import { StopwatchLapsComponent } from "./stopwatch/stopwatch-laps/stopwatch-laps.component";
import { StopwatchSkipHistoryComponent } from "./stopwatch/stopwatch-skip-history/stopwatch-skip-history.component";

@NgModule({
    declarations: [
        AppComponent,
        StopwatchContainerComponent,
        StopwatchDisplayComponent,
        StopwatchLapsComponent,
        StopwatchSkipHistoryComponent,
    ],
    imports: [BrowserModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
