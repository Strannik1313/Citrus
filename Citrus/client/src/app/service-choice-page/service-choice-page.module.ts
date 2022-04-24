import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceChoiceLayoutComponent } from './service-choice-wrapper/service-choice-layout/service-choice-layout.component';
import { RouterModule } from '@angular/router';
import { AppButtonModule } from '../shared/app-button-wrapper/app-button.module';
import { ServiceChoiceWrapperComponent } from './service-choice-wrapper/service-choice-wrapper.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ServiceChoiceLayoutComponent,
    ServiceChoiceWrapperComponent
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule.forChild([
      { path: '', component: ServiceChoiceWrapperComponent }
    ]),
  ]
})
export class ServiceChoicePageModule { }
