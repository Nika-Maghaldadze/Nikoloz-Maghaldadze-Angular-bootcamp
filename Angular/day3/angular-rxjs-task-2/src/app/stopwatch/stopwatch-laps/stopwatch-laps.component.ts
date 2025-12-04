import { Component, Input } from "@angular/core";
import { LapEntry } from "../../shared/models/stopwatch.model";
import { formatTimeMs } from "../../shared/utils/time-format";

@Component({
    selector: "app-stopwatch-laps",
    templateUrl: "./stopwatch-laps.component.html",
    styleUrls: ["./stopwatch-laps.component.scss"],
})
export class StopwatchLapsComponent {
    @Input() laps: LapEntry[] = [];

    formatTime(ms: number): string {
        return formatTimeMs(ms);
    }
}
