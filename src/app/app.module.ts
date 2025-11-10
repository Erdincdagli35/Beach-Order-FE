import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './features/auth/login/login.component';
import { OrdersComponent } from './features/orders/orders.component';

import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ProductListComponent } from './features/product-management-system/product-list/product-list.component';
import { CartComponent } from './features/orders/cart/cart/cart.component';
import { MyOrdersComponent } from './features/orders/my-orders/my-orders/my-orders.component';
import { ProductCreateComponent } from './features/product-management-system/product-create/product-create.component';
import { ProductDeleteComponent } from './features/product-management-system/product-delete/product-delete.component';
import { ProductEditComponent } from './features/product-management-system/product-edit/product-edit.component';
import { ProductMainMenuComponent } from './features/product-management-system/product-main-menu/product-main-menu.component';
import { OrderListComponent } from './features/product-management-system/order-list/order-list.component';
import { RoomListComponent } from './features/product-management-system/room-list/room-list.component';
import { CustomerProductListComponent } from './features/orders/customer-product-list/customer-product-list.component';
import { CustomerMainMenuComponent } from './features/orders/customer-main-menu/customer-main-menu.component';
import { CustomerOrderListComponent } from './features/orders/customer-order-list/customer-order-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductEditComponent,
    ProductMainMenuComponent,
    OrderListComponent,
    RoomListComponent,
    CustomerProductListComponent,
    CustomerMainMenuComponent,
    CustomerOrderListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'product-list', component:ProductListComponent}
    ])
    ],
  providers: [AuthService, TokenService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
