import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, combineLatest, of } from "rxjs";
import { catchError, map, shareReplay, switchMap } from "rxjs/operators";

import { Account, SelectableAccount } from "../models/account.model";
import { Rate } from "../models/rate.model";
import { TransferFormValue } from "../models/transfer.model";

@Injectable({ providedIn: "root" })
export class AccountsService {
    private readonly baseUrl = "http://localhost:3000";

    // -----------------------------
    // ✅ ACCOUNT SELECTION STATE
    // -----------------------------

    private readonly fromAccountId$ = new BehaviorSubject<number | null>(null);
    private readonly toAccountId$ = new BehaviorSubject<number | null>(null);

    setFromAccountId(id: number | null): void {
        this.fromAccountId$.next(id);
    }

    setToAccountId(id: number | null): void {
        this.toAccountId$.next(id);
    }

    // -----------------------------
    // ✅ RAW HTTP STREAMS (MATCH db.json)
    // -----------------------------

    readonly senderAccounts$: Observable<Account[]> = this.http
        .get<Account[]>(this.baseUrl + "/senders")
        .pipe(
            catchError(() => of([])),
            shareReplay(1)
        );

    private readonly receiverAccountsRaw$: Observable<Account[]> = this.http
        .get<Account[]>(this.baseUrl + "/receivers")
        .pipe(
            catchError(() => of([])),
            shareReplay(1)
        );

    private readonly fxRates$: Observable<Rate[]> = this.http
        .get<Rate[]>(this.baseUrl + "/fx-rates")
        .pipe(
            catchError(() => of([])),
            shareReplay(1)
        );

    // -----------------------------
    // ✅ RESOLVED SELECTED ACCOUNTS
    // -----------------------------

    readonly fromAccount$: Observable<Account | null> = combineLatest([
        this.senderAccounts$,
        this.fromAccountId$,
    ]).pipe(
        map(([accounts, id]) =>
            id === null ? null : accounts.find((a) => a.id === id) ?? null
        ),
        shareReplay(1)
    );

    readonly toAccountRaw$: Observable<Account | null> = combineLatest([
        this.receiverAccountsRaw$,
        this.toAccountId$,
    ]).pipe(
        map(([accounts, id]) =>
            id === null ? null : accounts.find((a) => a.id === id) ?? null
        ),
        shareReplay(1)
    );

    // -----------------------------
    // ✅ RECEIVER VIEW MODEL (SelectableAccount[])
    // -----------------------------

    readonly receiverAccounts$: Observable<SelectableAccount[]> = combineLatest(
        [this.receiverAccountsRaw$, this.fromAccount$]
    ).pipe(
        map(([accounts, from]): SelectableAccount[] =>
            accounts.map((acc) => {
                const disabledBecauseSameAccount =
                    from !== null && acc.id === from.id;

                const disabledForReceiver =
                    from !== null && acc.currency === from.currency;

                const tooltip: string | null = disabledBecauseSameAccount
                    ? "You cannot select the same physical account."
                    : disabledForReceiver
                    ? "This currency matches Account 1. Choose a different currency."
                    : null;

                return {
                    ...acc,
                    disabledForReceiver,
                    disabledBecauseSameAccount,
                    tooltip,
                };
            })
        ),
        shareReplay(1)
    );

    readonly toAccount$: Observable<Account | null> = this.toAccountRaw$.pipe(
        shareReplay(1)
    );

    // -----------------------------
    // ✅ FX RATE STREAM
    // -----------------------------

    readonly fxRate$: Observable<number | null> = combineLatest([
        this.fromAccount$,
        this.toAccount$,
        this.fxRates$,
    ]).pipe(
        map(([from, to, rates]) => {
            if (!from || !to || from.currency === to.currency) return null;

            const match = rates.find(
                (r) => r.from === from.currency && r.to === to.currency
            );

            return match ? match.rate : null;
        }),
        shareReplay(1)
    );

    // -----------------------------
    // ✅ CONVERT BALANCES (json-server PUT)
    // -----------------------------

    convertBalances(
        from: Account,
        to: Account,
        fromAmount: number,
        toAmount: number
    ): Observable<void> {
        const updatedFrom: Account = {
            ...from,
            balance: from.balance - fromAmount,
        };

        const updatedTo: Account = {
            ...to,
            balance: to.balance + toAmount,
        };

        return this.http
            .put<void>(this.baseUrl + "/senders/" + from.id, updatedFrom)
            .pipe(
                switchMap(() =>
                    this.http.put<void>(
                        this.baseUrl + "/receivers/" + to.id,
                        updatedTo
                    )
                )
            );
    }

    // -----------------------------
    // ✅ PURE FORM SWAP HELPER
    // -----------------------------

    swapAccounts(form: TransferFormValue): TransferFormValue {
        return {
            fromAccountId: form.toAccountId,
            toAccountId: form.fromAccountId,
            fromAmount: form.toAmount,
            toAmount: form.fromAmount,
        };
    }

    constructor(private readonly http: HttpClient) {}
}
