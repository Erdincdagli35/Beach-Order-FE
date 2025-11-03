import { Component, OnInit } from '@angular/core';

import { OrdersService } from '../../service/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  public orders: Order[] = [];
  public loading = false;
  constructor(public ordersService: OrdersService) {}

  ngOnInit() {
    this.loading = true;
    this.ordersService.myOrders().subscribe({
      next: o => { this.orders = o; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
