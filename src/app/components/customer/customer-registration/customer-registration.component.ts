import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from 'src/app/confirmed.validator';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

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
    },
    { 
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }

}
