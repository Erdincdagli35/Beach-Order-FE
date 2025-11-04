import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Product } from '../../models/product';
import { TokenService } from 'src/app/core/services/token.service';
// import { FormsModule } from '@angular/forms'; // <-- Bunu kaldır

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  showCreateForm = false;
  // newProduct'ı daha kesin tip vererek kullanmak hata riskini azaltır:
  newProduct: { name: string; price: number } = { name: '', price: 0 };

  // FormsModule burada olmamalı:
  constructor(private ps: ProductsService, private cart: CartService, public token: TokenService) {}

  toggleCreate() { this.showCreateForm = !this.showCreateForm; }

  createProduct() {
    if (!this.newProduct.name || this.newProduct.price == null) return;
    this.ps.create(this.newProduct).subscribe({
      next: p => {
        this.products.unshift(p);
        this.newProduct = { name: '', price: 0 };
        this.showCreateForm = false;
      },
      error: e => alert('Ürün eklenirken hata: ' + (e?.error?.message || e.message))
    });
  }

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

  onPriceChange(value: any): void {
  const parsed = Number(value);
  this.newProduct.price = isNaN(parsed) ? 0 : parsed;
}
}
