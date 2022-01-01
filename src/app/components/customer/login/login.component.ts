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

  get f() { return this.loginForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      console.log(this.userService.verifyCredentials(this.loginForm.value));
      //this.router.navigate(['/menu']);
    }
  
  }

  ngOnInit(): void {
   this.loginForm = this.formBuilder.group({
    mobile: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: ['', [Validators.required]],
    });
  }

}
