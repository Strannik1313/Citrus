import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPageWrapperComponent } from './login-page-wrapper/login-page-wrapper.component';
import { AuthFormModule } from '../shared/auth-form/auth-form.module';




@NgModule({
  declarations: [
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
