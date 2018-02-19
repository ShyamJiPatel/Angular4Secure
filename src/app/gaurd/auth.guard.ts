import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Injectable()
export class AuthGuard implements CanActivate {
	
	constructor(private router : Router, private appService : AppService){}
	
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		console.log("Inside auth gaurd");
		if(this.appService.checkCredentials()){
			return true;
		}
		this.router.navigate(['/login']);
		return false;
  }
}
