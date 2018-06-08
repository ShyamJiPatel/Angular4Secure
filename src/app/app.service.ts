import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';
import { User } from './user/user';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable()
export class AppService {

	public API_ENDPOINT = 'http://localhost:8080/api/ems/';

	constructor(private _router: Router, private _http: Http, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

	apiEndPoint(): string {
		return this.API_ENDPOINT;
	}


	obtainAccessToken(user: User) {
		let params = new URLSearchParams();
		params.append('username', user.email);
		params.append('password', user.password);
		params.append('grant_type', 'password');
		params.append('client_id', 'my-trusted-client');

		let headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa("my-trusted-client:secret") });
		let options = new RequestOptions({ headers: headers });

		this._http.post(this.API_ENDPOINT + 'oauth/token', params.toString(), options)
			.map(res => res.json())
			.subscribe(
				data => {
					// Save the token in cookie
					this.saveToken(data);
					// Goto dashboard page after successfully logged in
					this._router.navigate(['/dashboard']);
				},
				err => {
					console.log("Error occurred while login.");
					this._router.navigate(['/login']);
				}
			);
	}

	saveToken(token) {
		var expireDate = new Date().getTime() + (1000 * token.expires_in);
		this.storage.set("ems_access_token", token.access_token);
	}

	checkCredentials(): boolean {
		if (this.getToken()) {
			return true;
		}
		return false;
	}

	logout() {
		this.storage.remove('ems_access_token');
		console.log("Logout : " + !this.storage.get('ems_access_token'));
		this._router.navigate(['/login']);
	}

	getToken() {
		return this.storage.get('ems_access_token');
	}
}