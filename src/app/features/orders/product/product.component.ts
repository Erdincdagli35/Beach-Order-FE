import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  constructor(private ps: ProductsService, private cart: CartService) {}

  ngOnInit() {
    this.loading = true;
    this.ps.list().subscribe({
      next: p => { this.products = p; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  addToCart(p: Product) {
    this.cart.add(p, 1);
  }
}