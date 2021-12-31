import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { CustomerRegistrationComponent } from './components/customer/customer-registration/customer-registration.component';
import { LoginComponent } from './components/customer/login/login.component';
import { MenuComponent } from './components/customer/menu/menu.component';
import { OrderComponent } from './components/customer/order/order.component';
import { RegistrationSuccessComponent } from './components/customer/registration-success/registration-success.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
},
  {
    path: 'admin-login',
    component: AdminLoginComponent},

    {
      path: 'customer-login',
      component: LoginComponent
    },

    {
      path: 'customer-registration',
      component: CustomerRegistrationComponent
    },

    {
      path: 'registration-success',
      component: RegistrationSuccessComponent
    },

    {
      path: 'menu',
      component: MenuComponent
    },

    {
      path: 'order-confirmation',
      component: OrderComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
