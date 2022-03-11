import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmLayoutComponent } from './confirm-layout/confirm-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ConfirmLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ConfirmLayoutComponent }
    ])
  ]
})
export class ConfirmPageModule { }
