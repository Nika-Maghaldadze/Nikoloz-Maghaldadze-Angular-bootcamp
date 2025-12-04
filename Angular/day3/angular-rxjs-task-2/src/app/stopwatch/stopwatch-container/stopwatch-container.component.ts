import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import {
    StopwatchSpeed,
    StopwatchViewModel,
} from "../../shared/models/stopwatch.model";
import { StopwatchService } from "../stopwatch.service";

@Component({
    selector: "app-stopwatch-container",
    templateUrl: "./stopwatch-container.component.html",
    styleUrls: ["./stopwatch-container.component.scss"],
})
export class StopwatchContainerComponent implements OnInit, OnDestroy {
    public vm: StopwatchViewModel | null = null;
    public speedOptions: StopwatchSpeed[] = [0.5, 1, 2, 5];
    public customSkipControl = new FormControl<number | null>(null);
    private destroy$ = new Subject<void>();

    constructor(private stopwatch: StopwatchService) {}

    ngOnInit(): void {
        this.stopwatch.viewModel$
            .pipe(takeUntil(this.destroy$))
            .subscribe((vm) => (this.vm = vm));
    }
    get isRunning(): boolean {
        return !!this.vm?.running;
    }
    onToggleStartPause(): void {
        this.stopwatch.toggleStartPause();
    }
    onReset(): void {
        this.stopwatch.reset();
    }

    onLap(): void {
        this.stopwatch.addLap();
    }
    onSpeedClick(speed: StopwatchSpeed): void {
        this.stopwatch.setSpeed(speed);
    }
    onSkip(deltaSeconds: number): void {
        this.stopwatch.skip(deltaSeconds * 1000);
    }
    applyCustomSkip(sign: 1 | -1): void {
        const value = this.customSkipControl.value ?? 0;
        if (!value) {
            return;
        }
        const clamped = Math.max(1, Math.min(60, Math.abs(value)));
        this.customSkipControl.setValue(clamped, { emitEvent: false });

        this.stopwatch.skip(sign * clamped * 1000);
    }
    onUndoSkip(id: number): void {
        this.stopwatch.undoSkip(id);
    }

    @HostListener("document:keydown", ["$event"])
    handleKeydown(event: KeyboardEvent): void {
        if (event.repeat){
          return
        };
        switch (event.key) {
            case " ":
                event.preventDefault();
                this.onToggleStartPause();
                break;
            case "r":
            case "R":
                this.onReset();
                break;
            case "l":
            case "L":
                this.onLap();
                break;
            case "ArrowRight":
                this.onSkip(5);
                break;
            case "ArrowLeft":
                this.onSkip(-5);
                break;
            case "1":
                this.onSpeedClick(0.5);
                break;
            case "2":
                this.onSpeedClick(1);
                break;
            case "3":
                this.onSpeedClick(2);
                break;
            case "4":
                this.onSpeedClick(5);
                break;
            case "5":
                this.onSpeedClick(5);
                break;
        }
    }
    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
