import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _products$ = new BehaviorSubject<Product[]>([
    {
      id: 1,
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with blue switches.',
      category: 'electronics',
      price: 120
    },
    {
      id: 2,
      name: 'Gaming Mouse',
      description: 'High precision gaming mouse.',
      category: 'electronics',
      price: 60
    },
    {
      id: 3,
      name: 'Office Chair',
      description: 'Ergonomic chair for long working hours.',
      category: 'furniture',
      price: 220
    },
    {
      id: 4,
      name: 'Monitor 27"',
      description: '27 inch IPS 144Hz monitor.',
      category: 'electronics',
      price: 300
    },
    {
      id: 5,
      name: 'Notebook',
      description: 'Hard cover notebook for notes.',
      category: 'stationery',
      price: 10
    }
  ]);

  get products$(): Observable<Product[]> {
    return this._products$.asObservable();
  }
}
