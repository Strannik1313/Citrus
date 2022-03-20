import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceChoiceLayoutComponent } from './service-choice-layout/service-choice-layout.component';
import { RouterModule } from '@angular/router';
import { AppButtonModule } from '../shared/app-button-wrapper/app-button/app-button.module';



@NgModule({
  declarations: [
    ServiceChoiceLayoutComponent
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    RouterModule.forChild([
      { path: '', component: ServiceChoiceLayoutComponent }
    ]),
  ]
})
export class ServiceChoicePageModule { }
