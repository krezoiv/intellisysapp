import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { DeleteEmployeeComponent } from './employees/delete-employee/delete-employee.component';
import { DashboardAdministrationComponent } from './dashboard-administration/dashboard-administration.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AdministrationComponent,
    EditEmployeeComponent,
    NewEmployeeComponent,
    DeleteEmployeeComponent,
    DashboardAdministrationComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // Agrega ToastrModule a la lista de imports
  ]
})
export class AdministrationModule { }
