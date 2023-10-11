import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetelecomNewPurchaseComponent } from './retelecom-purchases/retelecom-new-purchase/retelecom-new-purchase.component';
import { RetelecomEditPurchaseComponent } from './retelecom-purchases/retelecom-edit-purchase/retelecom-edit-purchase.component';

import { AuthGuard } from '../guards/auth.guard';
import { RetelecomComponent } from './retelecom.component';
import { RetelecomNewSalesComponent } from './retelecom-sales/retelecom-new-sales/retelecom-new-sales.component';
import { RetelecomEditSalesComponent } from './retelecom-sales/retelecom-edit-sales/retelecom-edit-sales.component';
import { DashboardRetelecomComponent } from './dashboard-retelecom/dashboard-retelecom.component';

const routes: Routes = [
  {
    path: 'retelecom',
    component: RetelecomComponent,
    children: [
      { path: 'dashboard', component: DashboardRetelecomComponent },
      { path: 'Compras/EditarCompra', component: RetelecomEditPurchaseComponent },
      { path: 'Compras/NuevaCompra', component: RetelecomNewPurchaseComponent },
      { path: 'Ventas/EditarVenta', component: RetelecomEditSalesComponent },
      { path: 'Ventas/NuevaVenta', component: RetelecomNewSalesComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetelecomRoutingModule { }


