import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'
   ]
})
export class HeaderComponent implements OnInit {
	
  today = Date.now();

  constructor(private appService : AppService) {}

  ngOnInit() {
	  setInterval(()=>{
		this.today = Date.now();
	}, 1000 );
  }
  
  public isUserLoggedIn(){
	  return this.appService.checkCredentials();
  }
}
