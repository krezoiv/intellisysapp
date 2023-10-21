import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { DashboardMaintenanceComponent } from './dashboard-maintenance/dashboard-maintenance.component';
import { NewRoleComponent } from './roles/new-role/new-role.component';

const routes: Routes = [
  {
    path: 'mantenimiento',
    component: MaintenanceComponent,
    children:[
      { path: 'dashboard', component: DashboardMaintenanceComponent},
      { path: 'NuevoRole', component: NewRoleComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
