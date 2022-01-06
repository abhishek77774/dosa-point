import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService) {
   }

  orderDetailsForm:any =  FormGroup;
  submitted = false;
  maxDate = new Date();
  dateError:boolean = false;
  
  get f() { return this.orderDetailsForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    if (this.orderDetailsForm.invalid) {
        return;
    }

    let selectedDateForValidation = new Date(this.orderDetailsForm.value.orderDateSelector);
    
    if(selectedDateForValidation > new Date())
    {
     this.dateError=true;
     return; 
    }

    if(this.submitted)
    {
     this.dateError=false;
     const date = formatDate(this.orderDetailsForm.value["orderDateSelector"], 'yyyy/MM/dd', 'en');
     this.userService.saveOrderDateForPageRefresh(date);
    
     this.router.navigate(['view-date-orders']);
    }
  }

  ngOnInit(): void {
     //OrderDetails form
   this.orderDetailsForm = this.formBuilder.group({
    orderDateSelector: ['', [Validators.required]]
   })
  }

  goToVerifyUsersCom()
  {
    this.router.navigate(['view-users']);
  }

  goToUsersCom()
  {
    this.router.navigate(['view-all-users']);
  }

  goToTodaysOrdersCom()
  {
    this.router.navigate(['view-orders']);
  }

  goToUpdateMenu()
  {
    this.router.navigate(['update-menu']);
  }

}
