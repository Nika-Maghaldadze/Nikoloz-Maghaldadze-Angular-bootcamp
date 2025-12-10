import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Account,
  SelectableAccount
} from '../../../core/models/account.model';
@Component({
  selector: 'app-account-select',
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountSelectComponent),
      multi: true
    }
  ]
})
export class AccountSelectComponent implements ControlValueAccessor {
  @Input() label = 'Account';
  @Input() placeholder = 'Choose account';
  @Input() accounts: Array<Account | SelectableAccount> = [];

  public value: number | null = null;
  public disabled = false;
  onTouched: () => void = () => {};

  private onChange: (value: number | null) => void = () => {};

  writeValue(value: number | null): void {
    this.value = value;
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

  onSelectChange(event: Event): void {
    if (this.disabled) return;

    const target = event.target as HTMLSelectElement;
    const rawValue = target.value;
    const numeric = rawValue === '' ? null : Number(rawValue);

    this.value = Number.isNaN(numeric) ? null : numeric;
    this.onChange(this.value);
    this.onTouched();
  }
  isSelectable(acc: Account | SelectableAccount): acc is SelectableAccount {
    return (
      (acc as SelectableAccount).disabledForReceiver !== undefined &&
      (acc as SelectableAccount).disabledBecauseSameAccount !== undefined
    );
  }

  isOptionDisabled(acc: Account | SelectableAccount): boolean {
    if (this.isSelectable(acc)) {
      return acc.disabledForReceiver || acc.disabledBecauseSameAccount;
    }
    return false;
  }

  getOptionTooltip(acc: Account | SelectableAccount): string {
    if (this.isSelectable(acc)) {
      return acc.tooltip ?? '';
    }
    return '';
  }
  trackById(_: number, item: Account | SelectableAccount): number {
    return item.id;
  }
}
