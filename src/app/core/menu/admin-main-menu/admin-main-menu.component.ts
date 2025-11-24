import { Component } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product, Category} from '../../models/product/product';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main-menu',
  templateUrl: './admin-main-menu.component.html',
  styleUrls: ['./admin-main-menu.component.css']
})
export class AdminMainMenuComponent {

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
