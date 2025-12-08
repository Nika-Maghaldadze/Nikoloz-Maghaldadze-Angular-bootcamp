import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _cart$ = new BehaviorSubject<CartItem[]>([]);
  readonly cart$: Observable<CartItem[]> = this._cart$.asObservable();
  addToCart(product: Product): void {
    const items = [...this._cart$.value];
    const index = items.findIndex(i => i.id === product.id);
    if (index === -1) {
      items.push({ ...product, qty: 1 });
    } else {
      items[index] = { ...items[index], qty: items[index].qty + 1 };
    }
    this._cart$.next(items);
  }

  decreaseQuantity(productId: number): void {
    const items = [...this._cart$.value];
    const index = items.findIndex(i => i.id === productId);
    if (index === -1) {
      return;
    }
    const item = items[index];
    if (item.qty <= 1) {
      items.splice(index, 1);
    } else {
      items[index] = { ...item, qty: item.qty - 1 };
    }
    this._cart$.next(items);
  }
  removeItem(productId: number): void {
    this._cart$.next(this._cart$.value.filter(i => i.id !== productId));
  }
  clearCart(): void {
    this._cart$.next([]);
  }
  getTotal$(): Observable<number> {
    return this.cart$.pipe(
      map(items =>
        items.reduce((sum, item) => sum + item.price * item.qty, 0)
      )
    );
  }
}
