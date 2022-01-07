import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';

const auth = getAuth();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService, private toastr: ToastrService) {}
  
  userData: any;
  userInfo:any;
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
    
      //sign-in process
      signInWithEmailAndPassword(auth, this.loginForm.value["email"], this.loginForm.value["password"])
        .then((userCredential) => {
      this.userService.verifyCredentials(this.loginForm.value).then(status => 
        {
         if(status == 0)
         {   
          this.activationError = true;
          this.loading = false;  
          localStorage.setItem('user', "null");
         }
        
         else
         {
          this.loading = false;
          const user = userCredential.user;
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          localStorage.setItem('userCredentials', JSON.stringify(userCredential));
          this.getUserInfo(this.loginForm.value['email']);
          this.toastr.success('Login Success! Welcome');
          
          //manage user session
          let userSessionTimeout = null;
          if (user === null && userSessionTimeout) {
            clearTimeout(userSessionTimeout);
            userSessionTimeout = null;
          } else {
          user.getIdTokenResult().then((idTokenResult) => {
            const authTime = idTokenResult.claims.auth_time as any * 1000;
            const sessionDurationInMilliseconds = 60*5*1000; // 5 min
            const expirationInMilliseconds = sessionDurationInMilliseconds - (Date.now() - authTime);
           
            setTimeout(()=>{                           
              this.toastr.info("Your session will expire in 1 minute")
          }, expirationInMilliseconds - 60000);

            setTimeout(()=>{                           
              this.toastr.error("Session expired! Please login again.")
          }, expirationInMilliseconds);
           
            userSessionTimeout = setTimeout(() => this.userService.SignOut(), expirationInMilliseconds);
            
          });

          this.router.navigate(['/menu']);
         } 
        }
        });
    })
    .catch((error) => {
      localStorage.removeItem('user');
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode == "auth/user-not-found")
      {
        this.notRegisteredError = true;
        this.loading = false;
      }
      else if (errorCode == "auth/wrong-password")
      {
        this.credentialsError = true;
        this.loading = false;
      }
    });
      }
    }


  ngOnInit(): void {
   this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email
    ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required]],
    });
  }

  async getUserInfo(email:string)
  {
     await this.userService.getUserByEmail(email).then(data=>
      {
        this.userInfo = JSON.stringify(data);
      });
      localStorage.setItem('userInfo', this.userInfo);
  }
}
