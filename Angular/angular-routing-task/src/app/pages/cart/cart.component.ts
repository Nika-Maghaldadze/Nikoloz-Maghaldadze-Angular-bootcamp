import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/models/cart-item.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
    this.total$ = this.cartService.getTotal$();
  }

  increase(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  decrease(item: CartItem): void {
    this.cartService.decreaseQuantity(item.id);
  }

  remove(item: CartItem): void {
    this.cartService.removeItem(item.id);
  }
}
