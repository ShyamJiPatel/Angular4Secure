import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	private message:string="";
	private user:User;

  constructor(private router : Router, private appService : AppService ) { 
	console.log("Inside Login Controller");
  }

	ngOnInit() {
		this.user=new User();
		if(this.appService.checkCredentials()){
			this.router.navigate(['/dashboard']);
		}
	}
  
  signin(){
	  if(this.user){
		 this.appService.obtainAccessToken(this.user);
		 setTimeout(() => {  
			this.message="Invalid email or password.";
		}, 500);
	  }
  }
}


