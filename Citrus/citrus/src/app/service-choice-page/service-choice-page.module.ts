import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceChoiceLayoutComponent } from './service-choice-layout/service-choice-layout.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ServiceChoiceLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ServiceChoiceLayoutComponent }
    ]),
    MatButtonModule
  ]
})
export class ServiceChoicePageModule { }
