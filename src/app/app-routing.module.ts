import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { OrdersComponent } from './features/orders/orders.component';
import { AuthGuard } from './core/guards/auth.guard';

import { ProductListComponent } from './features/product-management-system/product-list/product-list.component';
import { ProductEditComponent } from './features/product-management-system/product-edit/product-edit.component';
import { ProductDeleteComponent } from './features/product-management-system/product-delete/product-delete.component';
import { ProductCreateComponent } from './features/product-management-system/product-create/product-create.component';
import { ProductMainMenuComponent } from './features/product-management-system/product-main-menu/product-main-menu.component';
import { CustomerProductListComponent } from './features/orders/customer-product-list/customer-product-list.component';
import { CustomerOrderListComponent } from './features/orders/customer-order-list/customer-order-list.component';
import { CustomerMainMenuComponent } from './features/orders/customer-main-menu/customer-main-menu.component';

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
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
