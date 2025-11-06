import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Product, Category } from '../../models/product';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 products: Product[] = [];
  loading = false;
  showCreateForm = false;
  errorMessage = '';
  // default category atamalısın (ör: Beer)
  newProduct: { name: string; price: number; category: Category } = {
    name: '',
    price: 0,
    category: Category.Beer
  };

  // kategori listesini template'e bağlamak için
  categories = Object.values(Category) as Category[];

  // Gruplanmış: { Beer: [...], Gin: [...] }
  groupedProducts: Record<string, Product[]> = {};

  constructor(
    private ps: ProductsService,
    private cart: CartService,
    public token: TokenService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.ps.list().subscribe({
      next: (p) => {
        this.products = p || [];
        this.groupByCategory();
        this.loading = false;
      },
      error: (err) => {
        console.error('Products list error', err);
        this.errorMessage = err?.error?.message || err.message || 'Liste yüklenirken hata oluştu.';
        this.loading = false;
      }
    });
  }

  private groupByCategory(): void {
    this.groupedProducts = {};
    for (const c of this.categories) {
      this.groupedProducts[c] = [];
    }
    for (const prod of this.products) {
      const cat = prod.category ?? 'Uncategorized';
      if (!this.groupedProducts[cat]) this.groupedProducts[cat] = [];
      this.groupedProducts[cat].push(prod);
    }
  }

}
