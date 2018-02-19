import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AppService } from '../app.service';
import { User } from '../user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
	private activeUserName:any;

  constructor(private userService:UserService, private appService : AppService) {}

  ngOnInit() {
	  this.activeUserName = this.userService.fetchUserDetails().subscribe(
		  data => {
			this.activeUserName = data;
		  },
		  err => {
			console.log(err);
		  }
		);
  }
  
  logoutUser(){
	  this.appService.logout();
  }
}
