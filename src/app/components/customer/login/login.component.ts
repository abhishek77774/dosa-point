import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavigationStart } from '@angular/router';

const auth = getAuth();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService) {
     
      
     }
  
  userData: any;
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
          console.log("signed in")
          this.router.navigate(['/menu']);
         } 
        });
    })
    .catch((error) => {
      localStorage.removeItem('user');
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode == "auth/user-not-found")
      {
        console.log("User:",localStorage.getItem('user'))
        this.notRegisteredError = true;
        this.loading = false;
      }
      else if (errorCode == "auth/wrong-password")
      {
        console.log("User:",localStorage.getItem('user'))
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

  
}
