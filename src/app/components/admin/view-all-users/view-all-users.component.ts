import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.scss']
})
export class ViewAllUsersComponent implements OnInit {

  allUsers = Array();
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
          this.allUsers.length = 0;
        }
      }
    });
     }

     async ngOnInit(): Promise<void> {
      this.allUsers.length = 0;
       await this.getAllUsers();
       this.loading = false;
    }

    async getAllUsers()
    {
      this.loading = true;
       await this.userService.getAllUsers().then(data=>
        {
          this.allUsers = data;
        });
    }
  
    async deactivateUser(i: number)
    {
      await this.userService.deactivateUser(this.allUsers[i].mobile).then(data=>
        {
        });
        this.toastr.success('User Deactivated');
        this.allUsers.length = 0;
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
