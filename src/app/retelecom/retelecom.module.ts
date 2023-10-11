
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetelecomRoutingModule } from './retelecom-routing.module';
import { RetelecomComponent } from './retelecom.component';
import { RetelecomEditPurchaseComponent } from './retelecom-purchases/retelecom-edit-purchase/retelecom-edit-purchase.component';
import { RetelecomNewPurchaseComponent } from './retelecom-purchases/retelecom-new-purchase/retelecom-new-purchase.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRetelecomComponent } from './dashboard-retelecom/dashboard-retelecom.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RetelecomEditSalesComponent } from './retelecom-sales/retelecom-edit-sales/retelecom-edit-sales.component';
import { RetelecomNewSalesComponent } from './retelecom-sales/retelecom-new-sales/retelecom-new-sales.component';
@NgModule({
  declarations: [
    RetelecomComponent,
    RetelecomEditPurchaseComponent,
    RetelecomNewPurchaseComponent,
    RetelecomNewSalesComponent,
    RetelecomEditSalesComponent,
    DashboardRetelecomComponent
  ],
  imports: [
    CommonModule,
    RetelecomRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule, // Agrega BrowserAnimationsModule
    MatMenuModule, // Agrega MatMenuModule
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule
  ]
  
   
})
export class RetelecomModule { }
