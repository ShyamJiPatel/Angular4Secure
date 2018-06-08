import { Injectable } from '@angular/core';
import { Project } from './project';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";
import { AppService } from '../app.service';

@Injectable()
export class ProjectService {

	private apiUrl = "";
	private headers = new Headers({ 'Content-type': 'application/json', 'Authorization': 'Bearer ' + this.appService.getToken() });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http, private appService: AppService) {
		this.apiUrl = appService.apiEndPoint() + "project";
	}

	findAll(): Observable<Project[]> {
		return this.http.get(this.apiUrl, this.options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	findById(id: number): Observable<Project> {
		return this.http.get(this.apiUrl + "/" + id, this.options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	saveProject(project: Project): any {
		let body = JSON.stringify(project);
		return this.http.post(this.apiUrl, body, this.options)
			.map((res: Response) => res.status)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	deleteProjectById(id: number): Observable<boolean> {
		return this.http.delete(this.apiUrl + "/" + id, this.options)
			.map((res: Response) => res.status)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

	updateProject(project: Project): any {
		let body = JSON.stringify(project);
		console.log("Inside update project " + project);
		return this.http
			.put(this.apiUrl, body, this.options)
			.map((res: Response) => res.status)
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
	}

}
