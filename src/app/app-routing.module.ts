import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/models/auth/login/login.component';
import { AuthGuard } from './core/authentication-system-management/guards/auth.guard';

import { ProductListComponent } from './core/product-management-system/product-list/product-list.component';
import { ProductEditComponent } from './core/product-management-system/product-edit/product-edit.component';
import { ProductDeleteComponent } from './core/product-management-system/product-delete/product-delete.component';
import { ProductCreateComponent } from './core/product-management-system/product-create/product-create.component';

import { OrderListComponent } from './core/order-management-system/order-list/order-list.component';
import { OrderCreateComponent } from './core/order-management-system/order-create/order-create.component';
import { OrderCancelComponent } from './core/order-management-system/order-cancel/order-cancel.component' ;

import { AdminMainMenuComponent } from './core/menu/admin-main-menu/admin-main-menu.component';
import { WaiterMainMenuComponent } from './core/menu/waiter-main-menu/waiter-main-menu.component';

import { WaiterProductListComponent } from './core/product-management-system/waiter-product-list/waiter-product-list.component';
import { WaiterOrderListComponent } from './core/order-management-system/waiter-order-list/waiter-order-list.component';

import { RoomListComponent } from './core/room-management-system/room-list/room-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin-main-menu', component: AdminMainMenuComponent},
  { path: 'product-list', component: ProductListComponent},
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/delete/:id', component: ProductDeleteComponent },
  { path: 'waiter-main-menu', component: WaiterMainMenuComponent},
  { path: 'waiter-product-list', component: WaiterProductListComponent},
  { path: 'waiter-order-list', component: WaiterOrderListComponent},
  { path: 'order-list', component: OrderListComponent},
  { path: 'order-create', component: OrderCreateComponent},
  { path: 'order-cancel', component: OrderCancelComponent},
  { path: 'room-list', component: RoomListComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
