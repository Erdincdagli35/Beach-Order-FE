import { Component } from '@angular/core';
import { OrdersService } from '../../services/order.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { Bill } from '../../models/order/bill';
import { Order } from '../../models/order/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

    orders: Order[] = [];
    errorMessage = '';

    newOrder: { id: number, status: string, total: number, createdAt:string, bills: Bill[], personalId: number} = {
      status: '',
      total: 0,
      createdAt: '',
      id: 0,
      bills: [],
      personalId: 0
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

  cancel(id: number): void {

    this.os.cancel(id).subscribe({
      next: () => { this.loadOrders(); },
      //error: err => { alert('Silme başarısız: ' + (err.message || err)); }
    });
  }

  willDeliver(id: number): void {

    this.os.willDeliver(id).subscribe({
      next: () => { this.loadOrders(); },
    });

    this.router.navigate(['admin-main-menu']);
  }

  delivered(id: number): void {

    this.os.delivered(id).subscribe({
      next: () => { this.loadOrders(); },
    });

    this.router.navigate(['admin-main-menu']);
  }
}
