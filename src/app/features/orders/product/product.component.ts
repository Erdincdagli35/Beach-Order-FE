import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Product } from '../../models/product';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  isAdmin = false;
  constructor(private ps: ProductsService, private cart: CartService, private token: TokenService) {}

  ngOnInit() {
    this.isAdmin = this.token.hasRole('ROLE_ADMIN');
    this.ps.list().subscribe(p => this.products = p);
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