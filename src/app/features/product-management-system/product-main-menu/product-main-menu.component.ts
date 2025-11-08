import { Component } from '@angular/core';
import { ProductsService } from '../../orders/service/product.service';
import { CartService } from '../../orders/service/cart.service';
import { Product, Category } from '../../models/product';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-main-menu',
  templateUrl: './product-main-menu.component.html',
  styleUrls: ['./product-main-menu.component.css']
})
export class ProductMainMenuComponent {

  products: Product[] = [];
  loading = false;
  showCreateForm = false;
  errorMessage = '';
  selectedCategory: string | null = null;

  // default category atamalısın (ör: Beer)
  newProduct: { name: string; price: number; description: string, category: Category } = {
    name: '',
    price: 0,
    description : '',
    category: Category.Beer
  };

  
}
