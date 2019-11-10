import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    SharedModule,
    AccountRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class AccountModule { }
