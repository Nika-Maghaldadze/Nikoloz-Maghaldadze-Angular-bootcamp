import { Component, forwardRef, Input, OnDestroy } from "@angular/core";
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    Validator,
    AbstractControl,
    ValidationErrors,
} from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

@Component({
    selector: "app-amount-input",
    templateUrl: "./amount-input.component.html",
    styleUrls: ["./amount-input.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AmountInputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AmountInputComponent),
            multi: true,
        },
    ],
})
export class AmountInputComponent
    implements ControlValueAccessor, Validator, OnDestroy
{
    @Input() label = "Amount";
    @Input() currency: string | null = null;
    @Input() max: number | null = null;

    private readonly destroy$ = new Subject<void>();
    private readonly inputChange$ = new Subject<number | null>();
    public value: number | null = null;
    public disabled = false;
    public touched = false;

    private onChange: (value: number | null) => void = () => {};
    private onTouched: () => void = () => {};

    constructor() {
        this.inputChange$
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((value) => {
                this.value = value;
                this.onChange(value);
            });
    }

    writeValue(obj: number | null): void {
        this.value = obj;
    }

    registerOnChange(fn: (value: number | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    markAsTouched(): void {
        if (!this.touched) {
            this.touched = true;
            this.onTouched();
        }
    }

    onInput(value: string): void {
        if (this.disabled) {
            return;
        }
        const numeric = value.trim() === "" ? null : Number(value);
        if (Number.isNaN(numeric)) {
            this.inputChange$.next(null);
            return;
        }
        this.inputChange$.next(numeric);
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.value === null || this.value === undefined) {
            return { required: true };
        }

        if (this.value <= 0) {
            return { min: true };
        }

        if (this.max !== null && this.value > this.max) {
            return { maxBalance: true };
        }

        return null;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
