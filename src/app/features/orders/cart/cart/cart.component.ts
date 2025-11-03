import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { OrdersService } from '../../service/order.service';
import { Router } from '@angular/router';

import { Order } from '../../../models/order';
import { OrderItem } from '../../../models/order-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public items: OrderItem[] = [];
  public loading = false;
  public error: string | null = null;

  constructor(public cart: CartService, private orders: OrdersService, private router: Router) {}

  ngOnInit() {
    this.items = this.cart.getItems();
    this.cart.cart$.subscribe(i => this.items = i);
  }

  updateItem(id: number, qty: number) { this.cart.update(id, qty); }

  remove(id: number) { this.cart.remove(id); }

  checkout() {
    if (!this.items || this.items.length === 0) return;
    this.loading = true;
    const order: Order = { items: this.items };
    this.orders.create(order).subscribe({
      next: (res) => {
        this.loading = false;
        this.cart.clear();
        this.router.navigate(['/orders']);
      },
      error: (err) => { this.loading = false; this.error = err?.error?.message || 'Sipariş oluşturulamadı'; }
    });
  }
}
