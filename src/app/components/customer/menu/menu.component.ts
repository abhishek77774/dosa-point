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
   menuFromDb = Array();
   finalAmount:number = 0;
   orderError = false;
   userInfoObject:any;
   foodItemIndex = [];
   newOrderNumber:number = 0;

  ngOnInit() {
    this.menuFromDb.length = 0;
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
 }


  decreaseQuantity(itemNumber:number, quantity:number, price:number, itemName:string)
  {
    if(this.menuFromDb[itemNumber].quantity>0)
    {
    this.menuFromDb[itemNumber].quantity = this.menuFromDb[itemNumber].quantity - 1;
    this.finalAmount = this.finalAmount -  price;  
  }
  }

  //processing order 
  async orderConfirmation()
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
      await this.getNewOrderId();
      this.orderedItems = "";
      this.menuFromDb.forEach((value) => {
        var item = value.itemName + "-" + value.quantity;
        if(value.quantity>0)
        {
        if(this.orderedItems.length>0)
        {
          this.orderedItems = this.orderedItems + ", ";
        }
        this.orderedItems = this.orderedItems + item;
      }
      });

      this.userInfoObject = JSON.parse(localStorage['userInfo']);
      
      //building order object
      this.order.orderNumber = this.newOrderNumber;
      this.order.customerName = this.userInfoObject.fullName;
      this.order.mobile = this.userInfoObject.mobile;
      this.order.orderedItems = this.orderedItems;
      this.order.totalAmount = this.finalAmount;
      this.order.orderDate = new Date();
      this.order.orderStatus = "Completed";
     
      this.saveOrder(this.order);
      this.router.navigate(['order'], {state: {newOrderNumber:this.newOrderNumber,
        totalAmount:this.finalAmount}});
    } 
  }
  }

    //generate new orderNumber
    async getNewOrderId()
    {
      await this.userService.getNewOrderId().then(data=>
        {
          this.newOrderNumber = data+1;
        });
        return this.newOrderNumber;
    }

  //method saves order in DB
  async saveOrder(orderData:OrderModel)
  {
    await this.userService.writeToOrdersCollection(orderData).then(data=>
      {
        console.log("Order is saved:")
      });
  }

}
