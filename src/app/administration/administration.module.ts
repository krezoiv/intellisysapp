import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { DeleteEmployeeComponent } from './employees/delete-employee/delete-employee.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    EditEmployeeComponent,
    NewEmployeeComponent,
    DeleteEmployeeComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
