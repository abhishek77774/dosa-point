import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-view-date-orders',
  templateUrl: './view-date-orders.component.html',
  styleUrls: ['./view-date-orders.component.scss']
})
export class ViewDateOrdersComponent implements OnInit {

  ordersData = Array();
  loading = false;
  orderDate: string = history.state.orderDate;
  savedDate:any;
  noOrdersError = false;

  constructor(private userService: UserServiceService,
    private router: Router) { 
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.ordersData.length = 0;
        }
      }
    });

    localStorage.setItem('orderDate', this.orderDate);
  }

  async getOrders()
  {
    this.loading = true;
     await this.userService.getOrders(localStorage.getItem('orderDate') as string).then(data=>
      {
        this.ordersData = data;
      }).catch((error) => {
        console.error(error);
      });
  }

  async ngOnInit(): Promise<void> {
    this.ordersData.length = 0;
     await this.getOrders();
     this.loading = false;
     if(this.ordersData.length == 0)
     {
       this.noOrdersError = true;
     }
  }

}
