import { Component, Input, forwardRef, OnDestroy } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectableAccount } from "../../../core/models/account.model";
import { Subject } from "rxjs";

@Component({
    selector: "app-account-select",
    templateUrl: "./account-select.component.html",
    styleUrls: ["./account-select.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AccountSelectComponent),
            multi: true,
        },
    ],
})
export class AccountSelectComponent implements ControlValueAccessor, OnDestroy {
    @Input() label = "Account";
    @Input() placeholder = "Choose account";
    @Input() accounts: SelectableAccount[] = [];

    private readonly destroy$ = new Subject<void>();

    public value: number | null = null;
    public disabled = false;
    public touched = false;

    private onChange: (value: number | null) => void = () => {};
    private onTouched: () => void = () => {};

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

    onSelect(value: string): void {
        if (this.disabled) {
            return;
        }
        const numeric = value === "" ? null : Number(value);
        this.value = Number.isNaN(numeric) ? null : numeric;
        this.onChange(this.value);
        this.markAsTouched();
    }

    markAsTouched(): void {
        if (!this.touched) {
            this.touched = true;
            this.onTouched();
        }
    }

    trackById(_: number, item: SelectableAccount): number {
        return item.id;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
