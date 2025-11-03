import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../orders/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  constructor(private ps: ProductsService) {}

  ngOnInit() {
    this.loading = true;
    this.ps.list().subscribe({
      next: p => { this.products = p; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

}