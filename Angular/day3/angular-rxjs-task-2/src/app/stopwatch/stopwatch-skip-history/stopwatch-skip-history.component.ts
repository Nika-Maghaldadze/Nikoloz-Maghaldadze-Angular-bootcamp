import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SkipEntry } from "../../shared/models/stopwatch.model";

@Component({
    selector: "app-stopwatch-skip-history",
    templateUrl: "./stopwatch-skip-history.component.html",
    styleUrls: ["./stopwatch-skip-history.component.scss"],
})
export class StopwatchSkipHistoryComponent {
    @Input() skips: SkipEntry[] = [];
    @Output() undoSkip = new EventEmitter<number>();

    onUndo(id: number): void {
        this.undoSkip.emit(id);
    }

    formatDelta(deltaMs: number): string {
        const seconds = deltaMs / 1000;
        return (seconds > 0 ? "+" : "") + seconds.toFixed(1) + "s";
    }
}
