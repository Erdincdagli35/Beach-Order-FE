import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { environment } from '../../../enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  base = environment.orderUrl;
  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.base}/api/orders`, order);
  }

  myOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.base}/api/orders`);
  }

  allOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.base}/api/orders/admin`);
  }

  deliver(orderId: number) {
    return this.http.post<Order>(`${this.base}/api/orders/${orderId}/deliver`, {});
  }
}
