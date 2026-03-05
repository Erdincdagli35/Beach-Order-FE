import { Component } from '@angular/core';
import { OrdersService } from '../../services/order.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { Bill } from '../../models/order/bill';
import { Order } from '../../models/order/order';

@Component({
  selector: 'app-waiter-order-list',
  templateUrl: './waiter-order-list.component.html',
  styleUrls: ['./waiter-order-list.component.css']
})
export class WaiterOrderListComponent {

  orders: Order[] = [];
      errorMessage = '';
  
      newOrder: { id: number, status: string, total: number, createdAt:string, bills: Bill[], personalId: number, roomNo: string} = {
        status: '',
        total: 0,
        createdAt: '',
        id: 0,
        bills: [],
        personalId: 0,
        roomNo: ''
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
        this.os.customerOrderList().subscribe({
          next: (p) => {
            this.orders = p || [];
          },
          error: (err) => {
            console.error('Order list error', err);
            this.errorMessage = err?.error?.message || err.message || 'Liste yüklenirken hata oluştu.';
          }
        });
      }

}
