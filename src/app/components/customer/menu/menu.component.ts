import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserServiceService) {
    
   }

   menuFromDb : any;
  finalAmount:number = 0;
  orderError = false;

  async ngOnInit(): Promise<void> {
    await this.userService.getMenu().then(data=>
      {
        this.menuFromDb = data;
      });
  }

  increaseQuantity(itemNumber:number, quantity:number)
  {
    this.menuFromDb[itemNumber].quantity = this.menuFromDb[itemNumber].quantity + 1;
  }


  decreaseQuantity(itemNumber:number, quantity:number)
  {
    if(this.menuFromDb[itemNumber].quantity>0)
    {
    this.menuFromDb[itemNumber].quantity = this.menuFromDb[itemNumber].quantity - 1;
    }
  }

  getFinalAmount()
  {
    return 0;
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
      this.router.navigate(['/order']);
    } 
  }
  }
}
