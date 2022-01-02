import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService) { }

  adminLoginForm:any =  FormGroup;
  submitted = false;
  loading = false;
  credentialsError = false;
  notRegisteredError = false;

  get f() { return this.adminLoginForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    this.credentialsError = false;
    this.notRegisteredError = false;

    if (this.adminLoginForm.invalid) {
        return;
    }

    if(this.submitted)
    {
      this.userService.verifyAdminCredentials(this.adminLoginForm.value).then(status => 
        {
         if(status == 1)
         {   
          console.log("true");
          this.loading = false;
          this.router.navigate(['/admin-home']);
         }
         else if(status == 2)
         {   
          this.loading = false;
          this.notRegisteredError = true;
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
   this.adminLoginForm = this.formBuilder.group({
    mobile: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    password: ['', [Validators.required]],
    });
  }

}
