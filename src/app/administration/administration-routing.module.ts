import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { DashboardAdministrationComponent } from './dashboard-administration/dashboard-administration.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { NewUserComponent } from './users/new-user/new-user.component';

const routes: Routes = [
  {
    path: 'administracion',
    component: AdministrationComponent,
    children: [
      { path: 'dashboard', component: DashboardAdministrationComponent },
      { path: 'nuevoEmpleado', component: NewEmployeeComponent },
      { path: 'nuevoUsuario', component: NewUserComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
