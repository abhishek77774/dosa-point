import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

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
  notAdminError = false;

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
      this.loading = true;
    
      //sign-in process
      signInWithEmailAndPassword(auth, this.adminLoginForm.value["email"], this.adminLoginForm.value["password"])
        .then((userCredential) => {
      this.userService.verifyAdminCredentials(this.adminLoginForm.value).then(status => 
        {
         if(status == 0)
         {   
          this.notAdminError = true;
          this.loading = false;  
         }
        
         else
         {
          this.loading = false;
          const user = userCredential.user;
          console.log("signed in")
          this.router.navigate(['/admin-home']);
         } 
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode == "auth/user-not-found")
      {
        this.notRegisteredError = true;
        this.loading = false;
      }
      console.log("Error:", errorMessage, errorCode)
      console.log("error code:", errorCode)
    });
      }
    }

  ngOnInit(): void {
   this.adminLoginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email
      ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required]],
    });
  }

}
