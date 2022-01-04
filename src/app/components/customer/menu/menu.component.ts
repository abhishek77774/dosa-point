import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { NavigationStart } from '@angular/router';
import { OrderModel } from 'src/app/model/OrderModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserServiceService) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.menuFromDb.length = 0;
        }
      }
    });
   }

   order: OrderModel = new OrderModel();
   orderedItems = "";
   totalQuantity = 0; 
   menuFromDb = Array();
   finalAmount:number = 0;
   orderError = false;
   userInfoObject:any;
   foodItemIndex = [];

  ngOnInit() {
    this.getMenu();
  }

  async getMenu()
  {
     await this.userService.getMenu().then(data=>
      {
        this.menuFromDb = data;
      });
  }

  increaseQuantity(itemNumber:number, quantity:number, price:number, itemName:string)
  {
    this.orderError = false;
    this.menuFromDb[itemNumber].quantity = this.menuFromDb[itemNumber].quantity + 1;
    this.finalAmount = this.finalAmount + price;
//    this.orderedItems.add(itemName);
  }


  decreaseQuantity(itemNumber:number, quantity:number, price:number, itemName:string)
  {
    if(this.menuFromDb[itemNumber].quantity>0)
    {
    this.menuFromDb[itemNumber].quantity = this.menuFromDb[itemNumber].quantity - 1;
    this.finalAmount = this.finalAmount -  price;  
    //this.orderedItems.delete(itemName);
  }
  }

  
  orderConfirmation()
  {
    if(this.finalAmount<=0)
    {
      this.orderError = true;
    }
    else
    {
    let isOrderConfirmed = confirm("Total Amount is: "+this.finalAmount +". Confirm the order?");
    if(isOrderConfirmed)
    {

      this.orderedItems = "";
      this.menuFromDb.forEach((value) => {
        var item = value.itemName + "-" + value.quantity;
        if(this.orderedItems.length>0)
        {
          this.orderedItems = this.orderedItems + ", ";
        }
        this.orderedItems = this.orderedItems + item;
      });

      this.userInfoObject = JSON.parse(localStorage['userInfo']);
      
      this.order.customerName = this.userInfoObject.fullName;
      this.order.mobile = this.userInfoObject.mobile;
      this.order.orderedItems = this.orderedItems;
      this.order.totalAmount = this.finalAmount;
      this.order.date = new Date();
      this.order.status = "Completed";

      console.log("Order is:", this.order);
    } 
  }
  }
}
