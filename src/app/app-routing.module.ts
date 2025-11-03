import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { OrdersComponent } from './features/orders/orders.component';
import { AuthGuard } from './core/guards/auth.guard';

import { ProductsComponent } from '../app/features/orders/product/product.component';
import { CartComponent } from '../app/features/orders/cart/cart/cart.component';
import { MyOrdersComponent } from '../app/features/orders/my-orders/my-orders/my-orders.component';
import { AdminOrdersComponent } from '../app/features/orders/admin-orders/admin-orders/admin-orders.component';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
