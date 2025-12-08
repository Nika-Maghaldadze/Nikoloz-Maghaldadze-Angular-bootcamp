import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../../core/models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CartService } from '../../../core/services/cart.service';

interface ProductFilterState {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  sort: 'price-asc' | 'price-desc' | '';
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  products$!: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;

  private filterState$ = new BehaviorSubject<ProductFilterState>({
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    sort: ''
  });

  filterForm = this.fb.group({
    search: [''],
    category: [''],
    minPrice: [''],
    maxPrice: [''],
    sort: ['']
  });

  categories = ['electronics', 'furniture', 'stationery'];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsService.products$;

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const state: ProductFilterState = {
          search: params['search'] || '',
          category: params['category'] || '',
          minPrice: params['minPrice'] ? Number(params['minPrice']) : null,
          maxPrice: params['maxPrice'] ? Number(params['maxPrice']) : null,
          sort: (params['sort'] as any) || ''
        };

        this.filterState$.next(state);

        this.filterForm.patchValue(
          {
            search: state.search,
            category: state.category,
            minPrice: state.minPrice?.toString() || '',
            maxPrice: state.maxPrice?.toString() || '',
            sort: state.sort
          },
          { emitEvent: false }
        );
      });

    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: val.search || null,
            category: val.category || null,
            minPrice: val.minPrice || null,
            maxPrice: val.maxPrice || null,
            sort: val.sort || null
          },
          queryParamsHandling: 'merge'
        });
      });

    this.filteredProducts$ = combineLatest([
      this.products$,
      this.filterState$
    ]).pipe(
      map(([products, filter]) => {
        let result = [...products];

        if (filter.search) {
          const q = filter.search.toLowerCase();
          result = result.filter(p => p.name.toLowerCase().includes(q));
        }

        if (filter.category) {
          result = result.filter(p => p.category === filter.category);
        }

        if (filter.minPrice !== null) {
          result = result.filter(p => p.price >= filter.minPrice!);
        }

        if (filter.maxPrice !== null) {
          result = result.filter(p => p.price <= filter.maxPrice!);
        }

        if (filter.sort === 'price-asc') {
          result.sort((a, b) => a.price - b.price);
        }

        if (filter.sort === 'price-desc') {
          result.sort((a, b) => b.price - a.price);
        }

        return result;
      })
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
