import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public userService: UserServiceService, public router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
      if(this.userService.isLoggedIn) {
       this.router.navigate(['customer-login'])
        return false;
     }
     return true;
  }
  
}
