import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../service/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit{
  orders: Order[] = [];
  loading = false;
  constructor(private ordersService: OrdersService) {}
  ngOnInit() { this.load(); }
  load() {
    this.loading = true;
    this.ordersService.allOrders().subscribe({ next: o => { this.orders = o; this.loading = false; }, error: () => this.loading = false });
  }
  deliver(o: Order) {
    if (!o.id) return;
    this.ordersService.deliver(o.id).subscribe({ next: () => this.load() });
  }
}
