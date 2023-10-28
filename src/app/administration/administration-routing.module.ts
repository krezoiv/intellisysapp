import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { DashboardAdministrationComponent } from './dashboard-administration/dashboard-administration.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { DlpAssignmentComponent } from './employees/dlp-assignment/dlp-assignment.component';


const routes: Routes = [
  {
    path: 'administracion',
    component: AdministrationComponent,
    children: [
      { path: 'dashboard', component: DashboardAdministrationComponent },
      { path: 'nuevo-empleado', component: NewEmployeeComponent },
      { path: 'listado-de-empleados', component: ListEmployeesComponent},
      { path: 'nuevo-usuario', component: NewUserComponent},
      { path: 'asignacion-dlp', component: DlpAssignmentComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
