import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserServiceService) { }

  menuFromDb=[];
  quantity:number = 0;
  dosaQuantity:number = 0;
  idlyQuantity:number = 0;
  bondaQuantity:number = 0;
  dosaAmount:number = 0;
  idlyAmount:number = 0;
  bondaAmount:number = 0;
  finalAmount:number = 0;
  orderError = false;

  ngOnInit(): void {
   this.userService.getMenu().then(data=>
    {
      console.log(data)
    });
  }

  increaseQuantity(itemNumber:number)
  {
    switch(itemNumber)
    {
      case 1:
      this.dosaQuantity = this.dosaQuantity+1;
      this.dosaAmount = this.dosaQuantity * 20;
      this.finalAmount = this.finalAmount + this.dosaAmount;
      this.orderError = false;
      break;
      case 2:
      this.idlyQuantity = this.idlyQuantity+1;
      this.idlyAmount = this.idlyQuantity * 15;
      this.finalAmount = this.finalAmount + this.idlyAmount;
      this.orderError = false;
      break;
      case 3:
      this.bondaQuantity = this.bondaQuantity+1;
      this.bondaAmount = this.bondaQuantity * 20;
      this.finalAmount = this.finalAmount + this.bondaAmount;
      this.orderError = false;
      break;
      default:
        break;
    }
  }


  decreaseQuantity(itemNumber:number)
  {
    switch(itemNumber)
    {
      case 1:
        if(this.dosaQuantity>0)
        {
      this.dosaQuantity = this.dosaQuantity-1;
      this.dosaAmount = this.dosaQuantity * 20;
        }
      break;
      case 2:
        if(this.idlyQuantity>0)
        {
      this.idlyQuantity = this.idlyQuantity-1;
      this.idlyAmount = this.idlyQuantity * 15;
       }
      break;
      case 3:
        if(this.bondaQuantity>0)
        {
      this.bondaQuantity = this.bondaQuantity-1;
      this.bondaAmount = this.bondaQuantity * 20;
        }
      break;
      default:
        break;
    }
  }

  getFinalAmount()
  {
    this.finalAmount = this.dosaAmount + this.idlyAmount + this.bondaAmount;
    return this.finalAmount;
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
