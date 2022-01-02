import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { UserServiceService } from 'src/app/services/user-service.service';
import {Md5} from 'ts-md5/dist/md5';

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
      
      console.log(Md5.hashStr(this.registrationForm.controls['password']));
    this.loading = true;
    this.registrationForm.controls['role'].setValue("user");
    this.registrationForm.controls['activated'].setValue(false);
    this.registrationForm.controls['timeStamp'].setValue(new Date());
    this.registrationForm.controls['password'].setValue(Md5.hashStr(this.registrationForm.controls['confirmPassword']));
    
    let formData = this.registrationForm.value;

      this.userService.writeToUsersCollection(formData);
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
