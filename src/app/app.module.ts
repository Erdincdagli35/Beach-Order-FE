import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/models/auth/login/login.component';
import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';
import { AuthGuard } from './core/authentication-system-management/guards/auth.guard';
import { AuthInterceptor } from './core/authentication-system-management/interceptors/auth.interceptor';

import { ProductListComponent } from './core/product-management-system/product-list/product-list.component';
import { ProductCreateComponent } from './core/product-management-system/product-create/product-create.component';
import { ProductDeleteComponent } from './core/product-management-system/product-delete/product-delete.component';
import { ProductEditComponent } from './core/product-management-system/product-edit/product-edit.component';
import { AdminMainMenuComponent } from './core/menu/admin-main-menu/admin-main-menu.component';
import { OrderListComponent } from './core/order-management-system/order-list/order-list.component';
import { WaiterProductListComponent } from './core/product-management-system/waiter-product-list/waiter-product-list.component';
import { WaiterMainMenuComponent } from './core/menu/waiter-main-menu/waiter-main-menu.component';
import { WaiterOrderListComponent } from './core/order-management-system/waiter-order-list/waiter-order-list.component';
import { OrderCreateComponent } from './core/order-management-system/order-create/order-create.component';
import { OrderCancelComponent } from './core/order-management-system/order-cancel/order-cancel.component';
import { OrderEditComponent } from './core/order-management-system/order-edit/order-edit.component';
import { RoomListComponent } from './core/room-management-system/room-list/room-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductDeleteComponent,
    ProductEditComponent,
    AdminMainMenuComponent,
    OrderListComponent,
    RoomListComponent,
    WaiterProductListComponent,
    WaiterMainMenuComponent,
    WaiterOrderListComponent,
    OrderCreateComponent,
    OrderCancelComponent,
    OrderEditComponent,
    RoomListComponent
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
