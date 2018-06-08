import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Notfound404Component } from './notfound404/notfound404.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AssignprojectComponent } from './assignproject/assignproject.component';
import { UserService } from './user/user.service';
import { AuthGuard } from './gaurd/auth.guard';
import { EmployeeService } from './employee/employee.service';
import { ProjectService } from './project/project.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectComponent } from './project/project.component';
import { ProjectFilterPipe } from './project/projectfilter.pipe';
import { EmployeefilterPipe } from './employee/employeefilter.pipe';
import { AppService } from './app.service';
import { DashboardDefaultComponent } from './dashboard-default/dashboard-default.component';
import { StorageServiceModule} from 'angular-webstorage-service';

const appRoutes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'dashboard', component: DashboardComponent, canActivate : [ AuthGuard ], children:[
		{path: '', component: DashboardDefaultComponent},
		{path: 'employee', component: EmployeeComponent},
		{path: 'project', component: ProjectComponent},
		{path: 'manageproject', component: AssignprojectComponent}
	] },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: '**', component: Notfound404Component, canActivate : [ AuthGuard ] }
];

@NgModule({
  declarations: [
	ProjectFilterPipe,
    EmployeefilterPipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    Notfound404Component,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    AssignprojectComponent,
    EmployeeComponent,
    ProjectComponent,
    DashboardDefaultComponent
    
  ],
  imports: [
   RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
	HttpModule,
	FormsModule,
  ReactiveFormsModule,
  StorageServiceModule
  ],
  providers: [UserService, ProjectService, EmployeeService, AuthGuard, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
