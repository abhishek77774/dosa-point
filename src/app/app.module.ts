import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewDateOrdersComponent } from './components/admin/view-date-orders/view-date-orders.component';
import { ViewAllUsersComponent } from './components/admin/view-all-users/view-all-users.component';
import { UserProfileComponent } from './components/customer/user-profile/user-profile.component';


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
    UpdateMenuComponent,
    ViewDateOrdersComponent,
    ViewAllUsersComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2400,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
