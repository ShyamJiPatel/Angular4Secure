import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { AppService } from '../app.service';

@Injectable()
export class UserService {

	private apiUrl = "";

	constructor(private http: Http, private appService: AppService) {
		console.log("Inside UserService Constructor");
		this.apiUrl = appService.apiEndPoint();
	}

	saveUser(user: User): any {
		let body = JSON.stringify(user);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.apiUrl + 'signup', body, options)
			.map((res: Response) => res.status)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	fetchUserDetails(): any {
		let headers = new Headers({ 'Content-type': 'application/json', 'Authorization': 'Bearer ' + this.appService.getToken() });
		let options = new RequestOptions({ headers: headers });
		return this.http.get(this.apiUrl + 'user/activeUser', options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	// login(email:string, pwd:string): Observable<User> {
	// return this.http.get(this.apiUrl + "/" + email + "/" + pwd)
	// .map((res:Response) => res.json())
	// .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	// }

}
