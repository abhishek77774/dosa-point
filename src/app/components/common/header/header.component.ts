import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser = false;

  constructor( private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  
  logout() {
    this.userService.SignOut();
  }

}
