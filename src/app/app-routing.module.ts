import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

import { ProductListComponent } from './features/core/product-management-system/product-list/product-list.component';
import { ProductEditComponent } from './features/core/product-management-system/product-edit/product-edit.component';
import { ProductDeleteComponent } from './features/core/product-management-system/product-delete/product-delete.component';
import { ProductCreateComponent } from './features/core/product-management-system/product-create/product-create.component';
import { ProductMainMenuComponent } from './features/core/product-management-system/product-main-menu/product-main-menu.component';
import { CustomerProductListComponent } from './features/core/customer-product-list/customer-product-list.component';
import { CustomerOrderListComponent } from './features/core/customer-order-list/customer-order-list.component';
import { CustomerMainMenuComponent } from './features/core/customer-main-menu/customer-main-menu.component';

import { OrderListComponent } from './features/core/order-management-system/order-list/order-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'product-main-menu', component: ProductMainMenuComponent},
  { path: 'product-list', component: ProductListComponent},
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/delete/:id', component: ProductDeleteComponent },
  { path: 'customer-main-menu', component: CustomerMainMenuComponent},
  { path: 'customer-product-list', component: CustomerProductListComponent},
  { path: 'customer-order-list', component: CustomerOrderListComponent},
  { path: 'order-list', component: OrderListComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
