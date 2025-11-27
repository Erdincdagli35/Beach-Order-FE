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
import { CustomerMainMenuComponent } from './core/menu/customer-main-menu/customer-main-menu.component';

import { CustomerProductListComponent } from './core/product-management-system/customer-product-list/customer-product-list.component';
import { CustomerOrderListComponent } from './core/order-management-system/customer-order-list/customer-order-list.component';

import { RoomListComponent } from './core/room-management-system/room-list/room-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'admin-main-menu', component: AdminMainMenuComponent},
  { path: 'product-list', component: ProductListComponent},
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/delete/:id', component: ProductDeleteComponent },
  { path: 'customer-main-menu', component: CustomerMainMenuComponent},
  { path: 'customer-product-list', component: CustomerProductListComponent},
  { path: 'customer-order-list', component: CustomerOrderListComponent},
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
