import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageLayoutComponent } from './login-page-wrapper/login-page-layout/login-page-layout.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginPageWrapperComponent } from './login-page-wrapper/login-page-wrapper.component';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';
import { AuthFormModule } from '../shared/auth-form/auth-form.module';




@NgModule({
  declarations: [
    LoginPageLayoutComponent,
    LoginPageWrapperComponent,
  ],
  imports: [
    CommonModule,
    AuthFormModule,
    RouterModule.forChild([
      {path: '', component: LoginPageWrapperComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class LoginPageModule { }
