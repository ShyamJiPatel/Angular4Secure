import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project';
import { AppService } from '../app.service';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	private addMode : boolean;
	private deleteMode : boolean;
	private updateMode : boolean;
	private detailMode : boolean;
	private submitted : boolean;
	private activeUser:User;
	
	private projects : Project[];
	
	private project : Project = new Project();
	
	private searchData:Project=new Project();

	constructor(private projectService : ProjectService, private appService:AppService, private router : Router) {
		// this.activeUser=appService.getActiveUser();
	}

	ngOnInit() {
	  console.log("Inside ProjectComponent");
	  this.getAllProjects();
	}

	getAllProjects() {
		return this.projectService.findAll().subscribe(
		  projects => {
			this.projects = projects;
		  },
		  err => {
			console.log(err);
			this.appService.logout();
		  }
		);
	}
	
	addProjectPage(){
		this.resetMode();
		this.project = new Project();
		this.addMode = true;
	}
	
	editProjectPage(project){
		if(project){
			this.resetMode();
			this.updateMode = true;
			this.project=JSON.parse(JSON.stringify(project))
		}
	}
	
	deleteProject(id){
		this.projectService.deleteProjectById(id)
		.subscribe(
			res=> {
					this.getAllProjects();
			},
			err => {
				console.log(err);
				this.appService.logout();
			}
		);
	}
	
	detailProjectPage(project){
		if(project){
			this.resetMode();
			this.detailMode = true;
			this.project=JSON.parse(JSON.stringify(project))
		}
	}
	
	resetMode(){
		this.addMode = false;
		this.deleteMode = false;
		this.updateMode = false;
		this.submitted = false;
		this.detailMode = false
	}
	
	clear(){
		this.project = new Project();
	}
	
	cancel(){
		this.resetMode();
		this.project = new Project();
	}
	
	saveProject(){
		if(this.project){
			this.projectService.saveProject(this.project)
			.subscribe(
				res=> {
					this.submitted=true;
					this.getAllProjects();
				},
				err => {
					console.log(err);
					this.appService.logout();
				}
			);
		}
	}
	updateProject(){
			if(this.project){
				this.projectService.updateProject(this.project)
				.subscribe(
					res=> {
						this.submitted=true;
						this.getAllProjects();
					},
					 err => {
						console.log(err);
						this.appService.logout();
					}
				);
			}
	}
	
	goBack(){
		this.resetMode();
		this.project = new Project();
	}
}
