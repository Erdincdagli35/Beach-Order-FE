import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './features/auth/login/login.component';
import { OrdersComponent } from './features/orders/orders.component';

import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ProductComponent } from './features/orders/product/product.component';
import { CartComponent } from './features/orders/cart/cart/cart.component';
import { MyOrdersComponent } from './features/orders/my-orders/my-orders/my-orders.component';
import { AdminOrdersComponent } from './features/orders/admin-orders/admin-orders/admin-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    ProductComponent,
    CartComponent,
    MyOrdersComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthService, TokenService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
