import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/customer/login/login.component';
import { MenuComponent } from './components/customer/menu/menu.component';
import { OrderComponent } from './components/customer/order/order.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { CustomerRegistrationComponent } from './components/customer/customer-registration/customer-registration.component';
import { RegistrationSuccessComponent } from './components/customer/registration-success/registration-success.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { ViewOrdersComponent } from './components/admin/view-orders/view-orders.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { UpdateMenuComponent } from './components/admin/update-menu/update-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    AdminLoginComponent,
    CustomerRegistrationComponent,
    RegistrationSuccessComponent,
    AdminHomeComponent,
    ViewUsersComponent,
    ViewOrdersComponent,
    UpdateMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
