import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { AppService } from '../app.service';

@Injectable()
export class EmployeeService {

	private apiUrl = '';

	private headers = new Headers({ 'Content-type': 'application/json', 'Authorization': 'Bearer ' + this.appService.getToken() });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http, private appService: AppService) {
		this.apiUrl = appService.apiEndPoint() + "employee";
	}

	findAll(): Observable<Employee[]> {
		return this.http.get(this.apiUrl, this.options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	findById(id: number): Observable<Employee> {
		return this.http.get(this.apiUrl + "/" + id, this.options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	saveEmployee(employee: Employee): any {
		let body = JSON.stringify(employee);
		console.log("Inside saveEmployee in employee service : " + JSON.stringify(employee));
		return this.http
			.post(this.apiUrl, body, this.options)
			.map((res: Response) => res.status)
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	deleteEmployeeById(id: number): Observable<boolean> {
		return this.http.delete(this.apiUrl + "/" + id, this.options)
			.map((res: Response) => res.status)
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	updateEmployee(employee: Employee): any {
		let body = JSON.stringify(employee);
		return this.http
			.put(this.apiUrl, body, this.options)
			.map((res: Response) => res.status)
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

}
