import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription, interval } from "rxjs";
import { filter, withLatestFrom } from "rxjs/operators";
import {
    LapEntry,
    SkipEntry,
    StopwatchSpeed,
    StopwatchViewModel,
} from "../shared/models/stopwatch.model";

@Injectable({
    providedIn: "root",
})
export class StopwatchService implements OnDestroy {
    private readonly tickMs = 100;

    private elapsedMs$ = new BehaviorSubject<number>(0);
    private running$ = new BehaviorSubject<boolean>(false);
    private speed$ = new BehaviorSubject<StopwatchSpeed>(1);
    private laps$ = new BehaviorSubject<LapEntry[]>([]);
    private skips$ = new BehaviorSubject<SkipEntry[]>([]);

    private idCounter = 1;
    private tickerSub: Subscription;

    viewModel$ = new BehaviorSubject<StopwatchViewModel>({
        elapsedMs: 0,
        running: false,
        speed: 1,
        laps: [],
        skips: [],
    });

    constructor() {
        this.tickerSub = interval(this.tickMs)
            .pipe(
                withLatestFrom(this.running$, this.speed$),
                filter(([_, running]) => running)
            )
            .subscribe(([_, running, speed]) => {
                const delta = this.tickMs * speed;
                const next = this.elapsedMs$.value + delta;
                this.updateElapsed(next);
            });

        this.syncViewModel();
    }

    private syncViewModel(): void {
        const update = () => {
            this.viewModel$.next({
                elapsedMs: this.elapsedMs$.value,
                running: this.running$.value,
                speed: this.speed$.value,
                laps: this.laps$.value,
                skips: this.skips$.value,
            });
        };

        this.elapsedMs$.subscribe(update);
        this.running$.subscribe(update);
        this.speed$.subscribe(update);
        this.laps$.subscribe(update);
        this.skips$.subscribe(update);
    }

    private updateElapsed(newValue: number): void {
        const clamped = Math.max(0, newValue);
        this.elapsedMs$.next(clamped);
    }

    start(): void {
        this.running$.next(true);
    }

    pause(): void {
        this.running$.next(false);
    }

    toggleStartPause(): void {
        this.running$.next(!this.running$.value);
    }

    reset(): void {
        this.running$.next(false);
        this.elapsedMs$.next(0);
        this.laps$.next([]);
        this.skips$.next([]);
    }

    setSpeed(speed: StopwatchSpeed): void {
        this.speed$.next(speed);
    }

    addLap(): void {
        const lap: LapEntry = {
            id: this.idCounter++,
            timeMs: this.elapsedMs$.value,
            createdAt: new Date(),
        };

        this.laps$.next([lap, ...this.laps$.value]);
    }

    skip(deltaMs: number): void {
        if (!deltaMs) return;

        const next = this.elapsedMs$.value + deltaMs;
        this.updateElapsed(next);

        const entry: SkipEntry = {
            id: this.idCounter++,
            deltaMs,
            createdAt: new Date(),
        };

        this.skips$.next([entry, ...this.skips$.value.slice(0, 9)]);
    }

    undoSkip(id: number): void {
        const currentSkips = this.skips$.value;
        const entry = currentSkips.find((s) => s.id === id);
        if (!entry) return;

        this.updateElapsed(this.elapsedMs$.value - entry.deltaMs);
        this.skips$.next(currentSkips.filter((s) => s.id !== id));
    }

    ngOnDestroy(): void {
        this.tickerSub?.unsubscribe();
    }
}
