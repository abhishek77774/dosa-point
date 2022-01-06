import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  myOrders = Array();
  loading = false;
  mySubscription: any;
  userEmail: any;
  noOrdersError = false;

  constructor(private userService: UserServiceService, private toastr: ToastrService,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.router.navigated = false;
      }
    });

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.myOrders.length = 0;
        }
      }
    });
    }

  async cancelOrder(i: number)
  {
    let isOrderConfirmed = confirm("Do you really want to Cancel this order?");
   
    if(isOrderConfirmed)
    {
    await this.userService.cancelOrder(this.myOrders[i].email, this.myOrders[i].orderNumber).then(data=>
      {
      });
      this.toastr.success('Order Cancelled');
      this.myOrders.length = 0;
      this.reLoad();
    }
  }

  async ngOnInit(): Promise<void> {
    this.userEmail = JSON.parse(this.userService.getLoggedInUser).email;
    this.myOrders.length = 0;
    
    await this.getMyOrders();
    
    if(this.myOrders.length == 0)
     {
        this.noOrdersError = true;
     }
     this.loading = false;
   }

  async getMyOrders()
  {
    this.loading = true;
     await this.userService.getMyOrders(this.userEmail).then(data=>
      {
        this.myOrders = data;
      });
  }

  reLoad(){
    this.router.navigate([this.router.url])
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
 }

}
