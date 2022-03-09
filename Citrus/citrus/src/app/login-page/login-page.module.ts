import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageLayoutComponent } from './components/login-page-layout/login-page-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginPageLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '/about', component: LoginPageLayoutComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class LoginPageModule { }
