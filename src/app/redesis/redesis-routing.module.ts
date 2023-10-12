import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from '../administration/administration.component';
import { NewEmployeeComponent } from '../administration/employees/new-employee/new-employee.component';
import { DashboardAdministrationComponent } from '../administration/dashboard-administration/dashboard-administration.component';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedesisRoutingModule { }
