import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../models/order';
import { environment } from '../../../../enviroments/environment';
import { environment as envProd } from '../../../../enviroments/enviroment.prod';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  base = envProd.orderUrl;
  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.base}/api/orders/create`, order);
  }

  myOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.base}/api/orders`);
  }

  list(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.base}/api/orders/list`);
  }

  deliver(orderId: number) {
    return this.http.post<Order>(`${this.base}/api/orders/${orderId}/deliver`, {});
  }
}
