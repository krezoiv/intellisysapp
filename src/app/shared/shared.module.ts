import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderRetelecomComponent } from './header-retelecom/header-retelecom.component';
import { HeaderAdministrationComponent } from './header-administration/header-administration.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';




@NgModule({
  declarations: [
    MainSidebarComponent,
    MainHeaderComponent,
    FooterComponent,
    HeaderRetelecomComponent,
    HeaderAdministrationComponent
  ],
  exports:[
    MainSidebarComponent,
    MainHeaderComponent,
    FooterComponent, 
    HeaderRetelecomComponent,
    HeaderAdministrationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
 

  
  ]
})
export class SharedModule { }
