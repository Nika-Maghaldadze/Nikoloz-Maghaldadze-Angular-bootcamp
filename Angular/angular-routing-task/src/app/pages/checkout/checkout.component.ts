import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CartService } from "../../core/services/cart.service";
import { Observable, firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-checkout",
    templateUrl: "./checkout.component.html",
    styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
    total$!: Observable<number>;
    hasItems$!: Observable<boolean>;

    form = this.fb.group({
        fullName: ["", Validators.required],
        address: ["", Validators.required],
        city: ["", Validators.required],
        zip: ["", Validators.required],
    });

    orderPlaced = false;

    constructor(private fb: FormBuilder, private cartService: CartService) {}

    ngOnInit(): void {
        this.total$ = this.cartService.getTotal$();

        this.hasItems$ = this.cartService.cart$.pipe(
            map((items) => items.length > 0)
        );
    }
    async submit(): Promise<void> {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const hasItems = await firstValueFrom(this.hasItems$);
        if (!hasItems) {
            return;
        }
        this.cartService.clearCart();
        this.orderPlaced = true;
    }
}
