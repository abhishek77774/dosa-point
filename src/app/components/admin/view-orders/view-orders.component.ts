import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  ordersData = Array();
  loading = false;
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
   }

  async getOrders()
  {
    this.loading = true;
     await this.userService.getOrders(formatDate(new Date(), 'yyyy/MM/dd', 'en')).then(data=>
      {
        this.ordersData = data;
      }).catch((error) => {
        console.error(error);
      });
  }

  async ngOnInit(): Promise<void> {
    this.ordersData.length = 0;
     await this.getOrders();
     if(this.ordersData.length == 0)
     {
        this.noOrdersError = true;
     }
     this.loading = false;
  }
}
