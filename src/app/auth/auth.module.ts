import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    RecoverPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
