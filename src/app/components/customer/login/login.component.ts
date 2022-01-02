import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService) { }

  loginForm:any =  FormGroup;
  submitted = false;
  loading = false;
  credentialsError = false;
  activationError = false;
  notRegisteredError = false;

  get f() { return this.loginForm.controls; }
  
  onSubmit() { 
    this.submitted = true;
    this.notRegisteredError = false;
    this.activationError = false;
    this.credentialsError = false;

    if (this.loginForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.loading = true;
    
      this.userService.verifyCredentials(this.loginForm.value).then(status => 
        {
         if(status == 1)
         {   
          console.log("true");
          this.loading = false;
          this.router.navigate(['/menu']);
         }
         else if(status == 2)
         {   
          this.loading = false;
          this.notRegisteredError = true;
         }
         else if(status == 3)
         {   
          this.loading = false;
          this.activationError = true;
         }
         else
         {
          this.loading = false;
          this.credentialsError = true;
         } 
        });
    }
  }

  ngOnInit(): void {
   this.loginForm = this.formBuilder.group({
    mobile: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: ['', [Validators.required]],
    });
  }

}
