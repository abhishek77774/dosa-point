import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  newUsers = Array();
  loading = false;

  constructor(private userService: UserServiceService, private toastr: ToastrService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.newUsers.length = 0;
     await this.getNewUsers();
     this.loading = false;
     console.log("new Users:", this.newUsers)
  }

  async getNewUsers()
  {
    this.loading = true;
     await this.userService.getNewUsers().then(data=>
      {
        this.newUsers = data;
      });
  }

  verifyUser(i: number)
  {
    this.userService.verifyUser(this.newUsers[i].mobile).then(data=>
      {
      });
      this.toastr.success('User Verified');
      this.ngOnInit();
      this.router.navigate(['view-users']);
  }

}
