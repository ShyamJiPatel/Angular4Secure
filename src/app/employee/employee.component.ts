import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { AppService } from '../app.service';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

	private addMode : boolean;
	private deleteMode : boolean;
	private updateMode : boolean;
	private detailMode : boolean;
	private submitted : boolean;
	private activeUser:User;
	private employees : Employee[];
	private employee : Employee = new Employee();
	private searchData:Employee=new Employee();

	constructor(private employeeService : EmployeeService, private appService:AppService, private router : Router) {
		// this.activeUser=appService.getActiveUser();
	}
	
	ngOnInit() {
	  console.log("Inside EmployeeComponent");
	  this.getAllEmployees();
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
	
	addEmployeePage(){
		this.resetMode();
		this.employee = new Employee();
		this.addMode = true;
	}
	
	editEmployeePage(employee){
		if(employee){
			this.resetMode();
			this.updateMode = true;
			this.employee=JSON.parse(JSON.stringify(employee))
		}
	}
	
	deleteEmployee(id){
		this.employeeService.deleteEmployeeById(id)
		.subscribe(
			res=> {
					this.getAllEmployees();
			},
			err => {
				console.log(err);
				this.appService.logout();
			}
		  );
	}
	
	detailEmployeePage(employee){
		if(employee){
			this.resetMode();
			this.detailMode = true;
			this.employee=JSON.parse(JSON.stringify(employee))
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
		this.employee = new Employee();
	}
	
	cancel(){
		this.resetMode();
		this.employee = new Employee();
	}
	
	saveEmployee(){
		if(this.employee){
			this.employeeService.saveEmployee(this.employee)
			.subscribe(
				res=> {
					this.submitted=true;
					this.getAllEmployees();
				},
				err => {
					console.log(err);
					this.appService.logout();
				}
			);
		}
	}
	updateEmployee(){
		if(this.employee){
			this.employeeService.updateEmployee(this.employee)
			.subscribe(
				res=> {
					this.submitted=true;
					this.getAllEmployees();
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
		this.employee = new Employee();
	}
}
