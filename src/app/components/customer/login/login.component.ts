import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  loginForm:any =  FormGroup;
  submitted = false;
  loading = false;

  get f() { return this.loginForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      //To do: User authentication
      alert("Great!!");
    }
  
  }


  ngOnInit(): void {
    //login form
   this.loginForm = this.formBuilder.group({
    mobile: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: ['', [Validators.required]],
    });
  }

}
