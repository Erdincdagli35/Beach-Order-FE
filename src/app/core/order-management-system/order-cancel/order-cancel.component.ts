import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/order.service';
import { Order } from '../../models/order/order';

@Component({
  selector: 'app-order-cancel',
  templateUrl: './order-cancel.component.html',
  styleUrls: ['./order-cancel.component.css']
})
export class OrderCancelComponent {

    order!: Order;
    orders : Order[] = [];

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private orderService: OrdersService
    ) {}


    ngOnInit(): void {
        this.order.id = this.route.snapshot.params['id'];
        console.log("this.order.id" + this.order.id);
          this.orderService.cancel(this.order.id).subscribe( data => {
            this.goToOrder();
            this.getOrder();
          })
      }

      private getOrder(){
        this.orderService.list().subscribe(data => {
          this.orders = data;
        });
      }

      goToOrder() {
        this.router.navigate(['admin-main-menu']);
      }
}
