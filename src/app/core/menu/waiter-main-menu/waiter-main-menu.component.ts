import { Component } from '@angular/core';
import { Product, Category } from '../../models/product/product';

@Component({
  selector: 'app-waiter-main-menu',
  templateUrl: './waiter-main-menu.component.html',
  styleUrls: ['./waiter-main-menu.component.css']
})
export class WaiterMainMenuComponent {

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
