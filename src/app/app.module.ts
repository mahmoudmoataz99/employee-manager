import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent  } from './components/employee-list/employee-list.component';
import { authGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
   
  ],
  imports: [
     AppComponent,
    LoginComponent,
    HomeComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [authGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }