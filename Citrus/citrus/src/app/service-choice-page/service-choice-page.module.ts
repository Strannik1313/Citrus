import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceChoiceLayoutComponent } from './service-choice-wrapper/service-choice-layout/service-choice-layout.component';
import { RouterModule } from '@angular/router';
import { AppButtonModule } from '../shared/app-button-wrapper/app-button/app-button.module';
import { ServiceChoiceWrapperComponent } from './service-choice-wrapper/service-choice-wrapper.component';



@NgModule({
  declarations: [
    ServiceChoiceLayoutComponent,
    ServiceChoiceWrapperComponent
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    RouterModule.forChild([
      { path: '', component: ServiceChoiceWrapperComponent }
    ]),
  ]
})
export class ServiceChoicePageModule { }
