import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { UserServiceService } from 'src/app/services/user-service.service';
import { getAuth, createUserWithEmailAndPassword, updateProfile, updatePhoneNumber } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';

const auth = getAuth();

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService, private toastr: ToastrService) { }

  registrationForm:any =  FormGroup;
  submitted = false;
  loading = false;
  alreadyRegisteredMobile = false;
  alreadyRegisteredEmail = false;

  get f() { return this.registrationForm.controls; }
  onSubmit() {
    this.alreadyRegisteredMobile = false;
    this.alreadyRegisteredEmail = false; 
    this.submitted = true;

    if (this.registrationForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.loading = true;
     
      this.userService.checkAlreadyRegisteredMobile(this.registrationForm.value).then(status => 
        {
         if(status == 1)
         {   
          this.alreadyRegisteredMobile = true;
          this.loading = false;  
          console.log("already registered mobile");
         }
         else
         {
         this.loading = true;  
         createUserWithEmailAndPassword(auth, this.registrationForm.value["email"], this.registrationForm.value["password"])
         .then((userCredential) => {
        // Sign up 
        this.registerUserForValidation(this.registrationForm);
        updateProfile(userCredential.user, {
          displayName: this.registrationForm.value["fullName"]
        })
        console.log("user created");
        this.loading = false;
        this.toastr.success('Registration Success. Your Account will be activated after verification.');
        this.router.navigate(['customer-login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        if(errorCode == "auth/email-already-in-use")
        {
          this.alreadyRegisteredEmail = true;
          this.loading = false;
        }
        console.log("error:", errorMessage, errorCode);
      });
         }
        });
  }
    
  }
  ngOnInit(): void {
    //Registration form
   this.registrationForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')]],
    mobile: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    email: ['', [Validators.required, Validators.email
      ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
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

  registerUserForValidation(registrationFormData:any)
  {
    registrationFormData.controls['role'].setValue("user");
    registrationFormData.controls['password'].setValue("********");
    registrationFormData.controls['confirmPassword'].setValue("********");
    registrationFormData.controls['activated'].setValue(false);
    registrationFormData.controls['timeStamp'].setValue(new Date());

    let formData = registrationFormData.value;

      this.userService.writeToUsersCollection(formData);
    
  }

}
