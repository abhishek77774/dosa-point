import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UpdateMenuComponent } from './components/admin/update-menu/update-menu.component';
import { ViewAllUsersComponent } from './components/admin/view-all-users/view-all-users.component';
import { ViewDateOrdersComponent } from './components/admin/view-date-orders/view-date-orders.component';
import { ViewOrdersComponent } from './components/admin/view-orders/view-orders.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { CustomerRegistrationComponent } from './components/customer/customer-registration/customer-registration.component';
import { LoginComponent } from './components/customer/login/login.component';
import { MenuComponent } from './components/customer/menu/menu.component';
import { OrderComponent } from './components/customer/order/order.component';
import { AuthGuard } from './helpers/auth.guard';


const routes: Routes = [
    {
    path: '',
    component: LoginComponent
    },

    {
    path: 'admin-login',
    component: AdminLoginComponent
    },

    {
      path: 'customer-login',
      component: LoginComponent
    },

    {
      path: 'customer-registration',
      component: CustomerRegistrationComponent
    },

    {
      path: 'menu',
      component: MenuComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'admin-home',
      component: AdminHomeComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'update-menu',
      component: UpdateMenuComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'view-orders',
      component: ViewOrdersComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'view-date-orders',
      component: ViewDateOrdersComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'view-users',
      component: ViewUsersComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'view-all-users',
      component: ViewAllUsersComponent,
      canActivate: [AuthGuard],
    },

    
    {
      path: 'order',
      component: OrderComponent,
      canActivate: [AuthGuard],
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
