import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedesisRoutingModule } from './redesis-routing.module';
import { RedesisComponent } from './redesis.component';
import { RedesisEditPurchaseComponent } from './redesis-purchases/redesis-edit-purchase/redesis-edit-purchase.component';
import { RedesisNewPurchaseComponent } from './redesis-purchases/redesis-new-purchase/redesis-new-purchase.component';
import { RedesisNewSaleComponent } from './redesis-sales/redesis-new-sale/redesis-new-sale.component';
import { RedesisEditSaleComponent } from './redesis-sales/redesis-edit-sale/redesis-edit-sale.component';


@NgModule({
  declarations: [
    RedesisComponent,
    RedesisEditPurchaseComponent,
    RedesisNewPurchaseComponent,
    RedesisNewSaleComponent,
    RedesisEditSaleComponent,
   
  ],
  imports: [
    CommonModule,
    RedesisRoutingModule
  ]
})
export class RedesisModule { }
