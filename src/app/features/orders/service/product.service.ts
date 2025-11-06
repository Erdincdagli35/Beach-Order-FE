import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { environment } from '../../../../enviroments/environment';
import { environment as envProd } from '../../../../enviroments/enviroment.prod';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  base = envProd.orderUrl;
  //base = environment.orderUrl;
  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}/api/products/list`);
  }

  get(id: number) {
    return this.http.get<Product>(`${this.base}/api/products/${id}`);
  }

  // admin create (optional)
  create(product: Partial<Product>) {
    return this.http.post<Product>(`${this.base}/api/products`, product);
  }
}
