import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService) { }

  registrationForm:any =  FormGroup;
  submitted = false;
  loading = false;

  get f() { return this.registrationForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    if (this.registrationForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      //To do: User authentication
      //after successfull registration redirect to success page
    this.loading = true;
    this.registrationForm.controls['role'].setValue("user");
    this.registrationForm.controls['activated'].setValue(false);
    this.registrationForm.controls['timeStamp'].setValue(new Date());
    let formData = this.registrationForm.value;

     //this.userService.writeToUsersCollection(formData);
      this.userService.readFromUsersCollectionForFirstEntry();
      this.router.navigate(['/registration-success']);
    }
  
  }

  ngOnInit(): void {
    //Registration form
   this.registrationForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    mobile: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    role: [''],
    activated: [''],
    timeStamp: ['']
    },
    { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

}
