import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { DashboardMaintenanceComponent } from './dashboard-maintenance/dashboard-maintenance.component';
import { NewRoleComponent } from './roles/new-role/new-role.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MaintenanceComponent,
    DashboardMaintenanceComponent,
    NewRoleComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MaintenanceModule {}
