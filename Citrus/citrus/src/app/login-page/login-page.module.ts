import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageLayoutComponent } from './components/login-page-layout/login-page-layout.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';




@NgModule({
  declarations: [
    LoginPageLayoutComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule.forChild([
      {path: '', component: LoginPageLayoutComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class LoginPageModule { }
