import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  adminLoginForm:any =  FormGroup;
  submitted = false;
  loading = false;

  //Add user form actions
  get f() { return this.adminLoginForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.adminLoginForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      alert("Great!!");
      this.router.navigate(["Enter navigation here"]);
    }
  
  }


  ngOnInit(): void {
    //login form
   this.adminLoginForm = this.formBuilder.group({
    mobile: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: ['', [Validators.required]],
    });
  }

}
