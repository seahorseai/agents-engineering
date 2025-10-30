import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  products: Observable<any[]> | undefined; // Observable for the final product list
  private categoryFilter$ = new BehaviorSubject<string>(''); // Category filter as a stream

  categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const allProducts$ = this.productService.getProducts(); // Fetch products from the service

    // Combine products with the selected filter
    this.products = combineLatest([allProducts$, this.categoryFilter$]).pipe(
      map(([products, category]) =>
        category ? products.filter((p) => p.category === category) : products
      )
    );
  }

  // Update the filter value
  filterByCategory(category: string) {
    this.categoryFilter$.next(category);
  }
}
