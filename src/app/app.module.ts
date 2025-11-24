import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './features/auth/login/login.component';

import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ProductListComponent } from './features/core/product-management-system/product-list/product-list.component';
import { ProductCreateComponent } from './features/core/product-management-system/product-create/product-create.component';
import { ProductDeleteComponent } from './features/core/product-management-system/product-delete/product-delete.component';
import { ProductEditComponent } from './features/core/product-management-system/product-edit/product-edit.component';
import { ProductMainMenuComponent } from './features/core/product-management-system/product-main-menu/product-main-menu.component';
import { OrderListComponent } from './features/core/order-management-system/order-list/order-list.component';
import { RoomListComponent } from './features/core/product-management-system/room-list/room-list.component';
import { CustomerProductListComponent } from './features/core/customer-product-list/customer-product-list.component';
import { CustomerMainMenuComponent } from './features/core/customer-main-menu/customer-main-menu.component';
import { CustomerOrderListComponent } from './features/core/customer-order-list/customer-order-list.component';
import { OrderCreateComponent } from './features/core/order-management-system/order-create/order-create.component';
import { OrderCancelComponent } from './features/core/order-management-system/order-cancel/order-cancel.component';


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
    OrderCreateComponent,
    OrderCancelComponent,
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
