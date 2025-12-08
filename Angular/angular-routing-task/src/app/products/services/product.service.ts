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
      price: 120,
      imageUrl: 'https://assets.corsair.com/image/upload/f_auto,q_auto/content/CH-9102021-CN-K68-BLU-KR-01.png'
    },
    {
      id: 2,
      name: 'Gaming Mouse',
      description: 'High precision gaming mouse.',
      category: 'electronics',
      price: 60,
      imageUrl: 'https://m.media-amazon.com/images/I/61i6QyWUpQS.jpg'
    },
    {
      id: 3,
      name: 'Office Chair',
      description: 'Ergonomic chair for long working hours.',
      category: 'furniture',
      price: 220,
      imageUrl: 'https://bestergonomicofficechairs.co.uk/wp-content/uploads/2024/12/Shaper-GR-Office-Chair-For-Long-Hours-UK.jpg'
    },
    {
      id: 4,
      name: 'Monitor 27"',
      description: '27 inch IPS 144Hz monitor.',
      category: 'electronics',
      price: 300,
      imageUrl: 'https://www.lg.com/ae/images/monitors/md07514525/gallery/desktop-01.jpg'
    },
    {
      id: 5,
      name: 'Notebook',
      description: 'Hard cover notebook for notes.',
      category: 'stationery',
      price: 10,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB_GNoCvfV06OwKYJcZj7X2raBHh6qUPp09A&s'
    },
    {
      id: 6,
      name: 'Wireless Headphones',
      description: 'Noise cancelling wireless headphones.',
      category: 'electronics',
      price: 180,
      imageUrl: 'https://m.media-amazon.com/images/I/51ZR4lyxBHL.jpg'
    },
    {
      id: 7,
      name: 'Desk Lamp',
      description: 'LED desk lamp with brightness control.',
      category: 'furniture',
      price: 35,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7-7MpXjdCUAjGKbSjXl4G5phLbvI_xKl1_w&s'
    },
    {
      id: 8,
      name: 'Smart Watch',
      description: 'Fitness tracking smart watch.',
      category: 'electronics',
      price: 150,
      imageUrl: 'https://m.media-amazon.com/images/I/61L0IA+A-LL.jpg'
    },
    {
      id: 9,
      name: 'Pen Set',
      description: 'Premium metal pen set.',
      category: 'stationery',
      price: 25,
      imageUrl: 'https://cultpens.com/cdn/shop/files/ZB00002_ZEBRA-Premium-Writing-Pen-Set_P2.png?v=1699886955&width=1080'
    },
    {
      id: 10,
      name: 'Laptop Stand',
      description: 'Adjustable aluminum laptop stand.',
      category: 'furniture',
      price: 70,
      imageUrl: 'https://m.media-amazon.com/images/I/71cOnHXOg9L.jpg'
    },
    {
      id: 11,
      name: 'Bluetooth Speaker',
      description: 'Portable waterproof speaker.',
      category: 'electronics',
      price: 90,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPU8BwaTcZTOz2FUp7Qf2FCl0UQC_f_1FcCA&s'
    },
    {
      id: 12,
      name: 'Planner 2025',
      description: 'Daily productivity planner.',
      category: 'stationery',
      price: 20,
      imageUrl: 'https://cld.accentuate.io/6861943013449/1666216335916/Intelligent-Change-inside-look-PDP-Productivity-Planner.png?v=1666216335916&options=w_600'
    },
    {
      id: 13,
      name: 'Coffee Maker',
      description: 'Automatic coffee brewing machine.',
      category: 'electronics',
      price: 250,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThJaBVXRkVW5MzhXPoyUC5CQejjoJ_E6Q--w&s'
    },
    {
      id: 14,
      name: 'Bookshelf',
      description: 'Wooden bookshelf with 5 levels.',
      category: 'furniture',
      price: 190,
      imageUrl: 'https://img.archiexpo.com/images_ae/photo-mg/104010-13191803.jpg'
    },
    {
      id: 15,
      name: 'Wireless Charger',
      description: 'Fast wireless phone charger.',
      category: 'electronics',
      price: 45,
      imageUrl: 'https://m.media-amazon.com/images/I/51pbKzrAd9L.jpg'
    }
  ]);

  get products$(): Observable<Product[]> {
    return this._products$.asObservable();
  }
}
