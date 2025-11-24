import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../core/models/order/order';
import { environment } from '../../../enviroments/environment';
import { environment as envProd } from '../../../enviroments/enviroment.prod';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  base = envProd.orderUrl ;
  //base = environment.orderUrl ;
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

  listById(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.base}/api/orders/list/${id}`);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/orders/cancel/${id}`);
  }
  
  update(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.base}/api/orders/edit/${id}`, order);
  }

  willDeliver(id: number): Observable<Order> {
    return this.http.put<Order>(`${this.base}/api/orders/will/deliver/${id}`,id);
  }

  delivered(id: number): Observable<Order> {
    return this.http.put<Order>(`${this.base}/api/orders/delivered/${id}`,id);
  }
}
