import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { NavigationStart } from '@angular/router';

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
          //this.menuFromDb.length = 0;
        }
      }
    });
   }

   menuFromDb = Array();
   finalAmount:number = 0;
   orderError = false;

  ngOnInit() {
    this.getMenu();
  }

  async getMenu()
  {
     this.userService.getMenu().then(data=>
      {
        this.menuFromDb = data;
      });
  }

  increaseQuantity(itemNumber:number, quantity:number, price:number)
  {
    this.menuFromDb[itemNumber].quantity = this.menuFromDb[itemNumber].quantity + 1;
    this.finalAmount = this.finalAmount + price;
  }


  decreaseQuantity(itemNumber:number, quantity:number, price:number)
  {
    if(this.menuFromDb[itemNumber].quantity>0)
    {
    this.menuFromDb[itemNumber].quantity = this.menuFromDb[itemNumber].quantity - 1;
    this.finalAmount = this.finalAmount -  price;  
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
      this.menuFromDb.length = 0;
      this.router.navigate(['/order']);
    } 
  }
  }
}
