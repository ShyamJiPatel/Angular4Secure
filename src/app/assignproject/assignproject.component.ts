import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { AppService } from '../app.service';

@Component({
  selector: 'app-assignproject',
  templateUrl: './assignproject.component.html',
  styleUrls: ['./assignproject.component.css']
})
export class AssignprojectComponent implements OnInit {
	
	private projects : Project[];
	private employees : Employee[];
	private selectedProject:Project;
	private selectedProjectEmployees:Employee[];
	private selection:Employee[]=[];
	private selectionIds:any[]=[];
	private updated:boolean=false;
	private activeUser:User;

  constructor(private projectService : ProjectService, private employeeService : EmployeeService, private router : Router, private appService:AppService) {
	// this.activeUser=appService.getActiveUser();
  }

  ngOnInit() {
	  console.log("Inside ProjectComponent");
	  
	  this.getAllEmployees();
	  this.getAllProjects();
	}

	getAllProjects() {
		return this.projectService.findAll().subscribe(
		  projects => {
			this.projects = projects;
	  
			if(this.projects.length>0){
				this.selectedProject=this.projects[0];
				this.changeProject();
			}
		  },
		  err => {
			console.log(err);
			this.appService.logout();
		  }
		);
	}
	
	getAllEmployees() {
		return this.employeeService.findAll().subscribe(
		  employees => {
			this.employees = employees;
		  },
		  err => {
			console.log(err);
			this.appService.logout();
		  }
		);
	}
	
	updateProject(project:Project){
			if(project){
				this.projectService.updateProject(project)
				.subscribe(
					res=> {
						this.router.navigate(['/dashboard/project']);
					},
					err => {
						console.log(err);
						this.appService.logout();
					}
				);
			}
	}
	
	assignEmployeesToProject() {
		this.selectedProjectEmployees = [];
		this.selectedProjectEmployees = this.selection;		
		
		if (this.selectedProjectEmployees !== undefined) {
			this.selectedProject.employees=this.selectedProjectEmployees;
			this.updateProject(this.selectedProject);
		}
	}

	changeProject() {
		if (this.selectedProject != null
				|| this.selectedProject != undefined) {
			this.selection = [];
			
			 this.selectedProject.employees.forEach(emp => {
				this.employees.every(childEmp => {
					if (emp.id == childEmp.id) {
						this.selection.push(childEmp);
						return false;
					}else{
						return true;
					}
				})
			});
		}
	}

	// toggle selection for a selected employee
	toggleSelection(employee) {
		let idx = this.selection.indexOf(employee);
		if (idx > -1) {
			this.selection.splice(idx, 1);
		}else {
			this.selection.push(employee);
		}
	}
	clear(){
		this.selection = [];
	}
	
	cancel(){
		this.selectedProject = null;
	}

}
