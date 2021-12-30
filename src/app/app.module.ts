import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './components/customer/login/login.component';
import { MenuComponent } from './components/customer/menu/menu.component';
import { OrderComponent } from './components/customer/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    LoginComponent,
    MenuComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
