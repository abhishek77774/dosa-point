import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { LoginComponent } from './components/customer/login/login.component';

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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
