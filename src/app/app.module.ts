import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';



import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; // Importa MatMenuModule
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';




import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    ToastrModule.forRoot(), // ToastrModule added
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule, // Agrega BrowserAnimationsModule
    MatMenuModule, // Agrega MatMenuModule
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule
  
   
  ],
  
  providers: [ DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, // Cambia 'es-ES' por el locale de tu preferencia
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }, // Opciones para MomentDateAdapter
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },],
  bootstrap: [AppComponent]
})
export class AppModule { }
