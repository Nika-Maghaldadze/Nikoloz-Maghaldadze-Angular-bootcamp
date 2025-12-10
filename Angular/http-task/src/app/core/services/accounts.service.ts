import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, debounceTime, map, shareReplay, switchMap, tap } from "rxjs";
import { Account, Currency } from "../models/account.model";
import { Rate } from "../models/rate.model";
import { HttpClient } from "@angular/common/http";
import { TransferFormValue } from "../models/transfer.model";

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly lastStateKey = 'transfer_last_state';

  private readonly fromAccountId$ = new BehaviorSubject<number | null>(null);
  private readonly toAccountId$ = new BehaviorSubject<number | null>(null);
  private readonly fromDraftAmount$ = new BehaviorSubject<number | null>(null);
  private readonly toDraftAmount$ = new BehaviorSubject<number | null>(null);

  readonly senderAccounts$ = this.http
    .get<Account[]>(`${this.baseUrl}/sender-accounts`)
    .pipe(shareReplay(1));

  readonly receiverAccountsRaw$ = this.http
    .get<Account[]>(`${this.baseUrl}/receiver-accounts`)
    .pipe(shareReplay(1));

  readonly Rates$ = this.http
    .get<Rate[]>(`${this.baseUrl}/fx-rates`)
    .pipe(shareReplay(1));

  readonly fromAccount$ = combineLatest([
    this.senderAccounts$,
    this.fromAccountId$
  ]).pipe(
    map(([accounts, id]) => accounts.find(a => a.id === id) ?? null),
    shareReplay(1)
  );

  readonly toAccount$ = combineLatest([
    this.receiverAccountsRaw$,
    this.toAccountId$
  ]).pipe(
    map(([accounts, id]) => accounts.find(a => a.id === id) ?? null),
    shareReplay(1)
  );

  readonly receiverAccounts$ = combineLatest([
    this.receiverAccountsRaw$,
    this.fromAccount$
  ]).pipe(
    map(([receivers, from]) =>
      receivers.map(receiver => {
        const forbidden =
          from && this.isForbiddenPair(from.currency, receiver.currency);
        const sameAccount = from && from.id === receiver.id;

        return {
          ...receiver,
          disabledForReceiver: !!forbidden,
          disabledBecauseSameAccount: !!sameAccount,
          tooltip: forbidden
            ? 'This currency matches Account 1 (GEL). Choose a different currency.'
            : sameAccount
            ? 'You cannot choose the same account for both sides.'
            : null
        };
      })
    ),
    shareReplay(1)
  );

  readonly Rate$ = combineLatest([
    this.fromAccount$,
    this.toAccount$,
    this.Rates$
  ]).pipe(
    map(([from, to, rates]) => {
      if (!from || !to || from.currency === to.currency) return null;
      const rate = rates.find(
        r => r.from === from.currency && r.to === to.currency
      );
      return rate ? rate.rate : null;
    }),
    shareReplay(1)
  );

  private readonly persist$ = combineLatest([
    this.fromAccountId$,
    this.toAccountId$,
    this.fromDraftAmount$,
    this.toDraftAmount$
  ]).pipe(
    debounceTime(300),
    tap(([fromId, toId, fromAmount, toAmount]) => {
      localStorage.setItem(
        this.lastStateKey,
        JSON.stringify({ fromAccountId: fromId, toAccountId: toId, fromAmount, toAmount })
      );
    }),
    shareReplay(1)
  );

  constructor(private readonly http: HttpClient) {
    this.restoreLastState();
    this.persist$.subscribe();
  }

  setFromAccountId(id: number | null): void {
    this.fromAccountId$.next(id);
  }

  setToAccountId(id: number | null): void {
    this.toAccountId$.next(id);
  }

  setFromDraftAmount(amount: number | null): void {
    this.fromDraftAmount$.next(amount);
  }

  setToDraftAmount(amount: number | null): void {
    this.toDraftAmount$.next(amount);
  }

  swapAccounts(formValue: TransferFormValue): TransferFormValue {
  return {
    fromAccountId: formValue.toAccountId,
    toAccountId: formValue.fromAccountId,
    fromAmount: null,
    toAmount: null
  };
}


  convertBalances(from: Account, to: Account, fromAmount: number, toAmount: number) {
    const from$ = this.http.put<Account>(
      `${this.baseUrl}/sender-accounts/${from.id}`,
      { ...from, balance: from.balance - fromAmount }
    );

    const to$ = this.http.put<Account>(
      `${this.baseUrl}/receiver-accounts/${to.id}`,
      { ...to, balance: to.balance + toAmount }
    );

    return from$.pipe(
      switchMap(updatedFrom =>
        to$.pipe(map(updatedTo => [updatedFrom, updatedTo] as [Account, Account]))
      )
    );
  }

  private isForbiddenPair(from: Currency, to: Currency): boolean {
    return from === to && from === 'GEL';
  }

  private restoreLastState(): void {
    const raw = localStorage.getItem(this.lastStateKey);
    if (!raw) return;

    try {
      const state = JSON.parse(raw);
      this.fromAccountId$.next(state.fromAccountId);
      this.toAccountId$.next(state.toAccountId);
      this.fromDraftAmount$.next(state.fromAmount);
      this.toDraftAmount$.next(state.toAmount);
    } catch {
      localStorage.removeItem(this.lastStateKey);
    }
  }
}
