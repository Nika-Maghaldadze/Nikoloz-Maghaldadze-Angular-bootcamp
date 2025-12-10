import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import {
    Subject,
    combineLatest,
    merge,
    Observable,
    BehaviorSubject,
} from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    shareReplay,
    startWith,
    takeUntil,
    withLatestFrom,
} from "rxjs/operators";
import {
    TransferFormValue,
    TransferViewModel,
} from "../../core/models/transfer.model";
import { AccountsService } from "../../core/services/accounts.service";

@Component({
    selector: "app-transfer",
    templateUrl: "./transfer.component.html",
    styleUrls: ["./transfer.component.scss"],
})
export class TransferComponent implements OnInit, OnDestroy {
    readonly form: FormGroup;
    readonly vm$!: Observable<TransferViewModel>;
    readonly errorMessage$!: Observable<string | null>;
    readonly successMessage$ = new BehaviorSubject<string | null>(null);

    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly fb: FormBuilder,
        private readonly accountsService: AccountsService,
        private readonly route: ActivatedRoute
    ) {
        this.form = this.fb.group<TransferFormValue>({
            fromAccountId: this.fb.control<number | null>(null),
            toAccountId: this.fb.control<number | null>(null),
            fromAmount: this.fb.control<number | null>(null),
            toAmount: this.fb.control<number | null>(null),
        } as any);

        const formValue$ = this.form.valueChanges.pipe(
            startWith(this.form.getRawValue() as TransferFormValue),
            debounceTime(50),
            shareReplay(1)
        );

        this.vm$ = combineLatest([
            this.accountsService.senderAccounts$,
            this.accountsService.receiverAccounts$,
            this.accountsService.fromAccount$,
            this.accountsService.toAccount$,
            this.accountsService.fxRate$,
            formValue$,
        ]).pipe(
            map(([senders, receivers, from, to, rate, form]) => {
                const balanceExceeded =
                    from !== null &&
                    form.fromAmount !== null &&
                    form.fromAmount > from.balance;

                const canConvert =
                    from !== null &&
                    to !== null &&
                    rate !== null &&
                    !balanceExceeded &&
                    form.fromAmount !== null &&
                    form.fromAmount > 0 &&
                    from.currency !== to.currency;

                return {
                    senderAccounts: senders,
                    receiverAccounts: receivers,
                    fromAccount: from,
                    toAccount: to,
                    fxRate: rate,
                    canConvert,
                    balanceExceeded,
                };
            }),
            shareReplay(1)
        );

        this.errorMessage$ = this.vm$.pipe(
            map((vm) => {
                if (vm.balanceExceeded)
                    return "Amount exceeds available balance.";
                if (!vm.fromAccount || !vm.toAccount)
                    return "Select both accounts.";
                if (vm.fromAccount.currency === vm.toAccount.currency)
                    return "Currencies must be different.";
                if (vm.fxRate === null) return "No FX rate available.";
                return null;
            })
        );
    }

    ngOnInit(): void {
        this.handleRoutePreselect();
        this.connectAccountSelection();
        this.setupBiDirectionalAmountLogic();
    }
    private handleRoutePreselect(): void {
        this.route.paramMap
            .pipe(
                map((p) => p.get("fromAccountId")),
                map((v) => (v === null ? null : Number(v))),
                filter((v) => v !== null && !Number.isNaN(v)),
                takeUntil(this.destroy$)
            )
            .subscribe((id) => {
                this.form.patchValue({ fromAccountId: id });
            });
    }
    private connectAccountSelection(): void {
        this.form
            .get("fromAccountId")
            ?.valueChanges.pipe(
                debounceTime(100),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((id) => {
                this.accountsService.setFromAccountId(id);
            });

        this.form
            .get("toAccountId")
            ?.valueChanges.pipe(
                debounceTime(100),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((id) => {
                this.accountsService.setToAccountId(id);
            });
    }
    private setupBiDirectionalAmountLogic(): void {
        const fromCtrl = this.form.get("fromAmount");
        const toCtrl = this.form.get("toAmount");
        if (!fromCtrl || !toCtrl) return;

        const from$ = fromCtrl.valueChanges.pipe(
            map((v) => ({ source: "from" as const, value: v }))
        );

        const to$ = toCtrl.valueChanges.pipe(
            map((v) => ({ source: "to" as const, value: v }))
        );

        merge(from$, to$)
            .pipe(
                debounceTime(120),
                withLatestFrom(this.accountsService.fxRate$),
                takeUntil(this.destroy$)
            )
            .subscribe(([change, rate]) => {
                if (!rate || rate <= 0) {
                    this.form.patchValue(
                        { fromAmount: null, toAmount: null },
                        { emitEvent: false }
                    );
                    return;
                }

                const num =
                    change.value === null || change.value === ""
                        ? null
                        : Number(change.value);

                if (num === null || !Number.isFinite(num)) {
                    this.form.patchValue(
                        { fromAmount: null, toAmount: null },
                        { emitEvent: false }
                    );
                    return;
                }

                if (change.source === "from") {
                    this.form.patchValue(
                        { toAmount: num * rate },
                        { emitEvent: false }
                    );
                } else {
                    this.form.patchValue(
                        { fromAmount: num / rate },
                        { emitEvent: false }
                    );
                }
            });
    }
    onConvert(vm: TransferViewModel): void {
        if (!vm.canConvert || !vm.fromAccount || !vm.toAccount) {
            return;
        }

        const fromAmountRaw = this.form.get("fromAmount")?.value;
        const toAmountRaw = this.form.get("toAmount")?.value;

        const fromValue = Number(fromAmountRaw);
        const toValue = Number(toAmountRaw);

        if (!Number.isFinite(fromValue) || !Number.isFinite(toValue)) {
            return;
        }

        this.accountsService
            .convertBalances(vm.fromAccount, vm.toAccount, fromValue, toValue)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.successMessage$.next(
                    String(fromValue) +
                        " is converted successfully into " +
                        String(toValue)
                );

                this.form.reset({
                    fromAccountId: null,
                    toAccountId: null,
                    fromAmount: null,
                    toAmount: null,
                });
                this.accountsService.setFromAccountId(null);
                this.accountsService.setToAccountId(null);
            });
    }
    onSwapAccounts(): void {
        const swapped = this.accountsService.swapAccounts(
            this.form.value as TransferFormValue
        );

        this.form.patchValue(swapped);
        this.accountsService.setFromAccountId(swapped.fromAccountId);
        this.accountsService.setToAccountId(swapped.toAccountId);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
