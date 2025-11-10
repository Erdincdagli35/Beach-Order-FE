import { Component } from '@angular/core';
import { Product, Category } from '../../models/product';

@Component({
  selector: 'app-customer-main-menu',
  templateUrl: './customer-main-menu.component.html',
  styleUrls: ['./customer-main-menu.component.css']
})
export class CustomerMainMenuComponent {

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
