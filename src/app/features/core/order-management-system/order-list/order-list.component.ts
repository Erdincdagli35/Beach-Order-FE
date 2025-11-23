import { Component } from '@angular/core';
import { OrdersService } from '../../service/order.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/features/models/order';
import { Bill } from 'src/app/features/models/bill';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

    orders: Order[] = [];
    errorMessage = '';
  
    // default category atamalısın (ör: Beer)
    newOrder: { id: number, status: string, total: number, createdAt:string, bills: Bill[]} = {
      status: '',
      total: 0,
      createdAt: '',
      id: 0,
      bills: []
    };
  
  
    constructor(
      private os: OrdersService,
      private router: Router,
      public token: TokenService
    ) {}
  
    ngOnInit(): void {
      this.loadOrders();
    }
  
    loadOrders(): void {
      this.errorMessage = '';
      this.os.list().subscribe({
        next: (p) => {
          this.orders = p || [];
        },
        error: (err) => {
          console.error('Order list error', err);
          this.errorMessage = err?.error?.message || err.message || 'Liste yüklenirken hata oluştu.';
        }
      });
    }

  create(): void {
    this.router.navigate(['order-create']);
  }
}
