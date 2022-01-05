import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  mySubscription: any;

  constructor(private userService: UserServiceService, private toastr: ToastrService,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.router.navigated = false;
      }
    });

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.newUsers.length = 0;
        }
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.newUsers.length = 0;
     await this.getNewUsers();
     this.loading = false;
  }

  async getNewUsers()
  {
    this.loading = true;
     await this.userService.getNewUsers().then(data=>
      {
        this.newUsers = data;
      });
  }

  async verifyUser(i: number)
  {
    await this.userService.verifyUser(this.newUsers[i].mobile).then(data=>
      {
      });
      this.toastr.success('User Verified');
      this.newUsers.length = 0;
      this.reLoad();
  }

  reLoad(){
    this.router.navigate([this.router.url])
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
   }
}
