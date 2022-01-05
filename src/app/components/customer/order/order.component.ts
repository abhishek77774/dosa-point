import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderNumber:any = history.state.newOrderNumber;
  totalAmount:any = history.state.totalAmount;;

  constructor(private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {
    console.log("order no. is:", this.orderNumber)
  }

  goToMenu()
  {
    this.userService.clearMenu();
    this.router.navigate(['menu']);
  }

}
