import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	
	private user:User;
	private message:string;
	private submitted:boolean=false;

  constructor(private userService:UserService ) { 
  }

  ngOnInit() {
	  this.resetMode();
  }
  
  signup(){
		if(this.user){
			this.userService.saveUser(this.user)
			.subscribe(res=> {
				this.message="You have been successfully created account.";
				this.user=new User();
				this.submitted=true;
			});
		}
	}
	
	resetMode(){
		this.submitted=false;
		this.message="";
		this.user=new User();
	}

}
