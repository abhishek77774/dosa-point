import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { UserServiceService } from 'src/app/services/user-service.service';
import { getAuth, createUserWithEmailAndPassword, updateProfile, updatePhoneNumber, updatePassword } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';

const auth = getAuth();

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm:any = FormGroup;
  submitted = false;
  loading = false;
  
  constructor(private formBuilder: FormBuilder, private router: Router,
    private userService: UserServiceService, private toastr: ToastrService) { }

    get f() { return this.updateProfileForm.controls; }
  
    onSubmit() {
      this.submitted = true;
  
      if (this.updateProfileForm.invalid) {
          return;
      }
      if(this.submitted)
      {
        //this.loading = true;
        //password change logic here
      }
    }
      
  ngOnInit(): void {
    this.updateProfileForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
      },
      { 
        validator: ConfirmedValidator('password', 'confirmPassword')
      });
  }

}
function getASecureRandomPassword() {
  throw new Error('Function not implemented.');
}

function updateEmailOrPassword() {
  throw new Error('Function not implemented.');
}

