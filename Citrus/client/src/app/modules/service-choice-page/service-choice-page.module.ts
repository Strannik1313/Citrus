import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceChoiceLayoutComponent } from '../../components/ui/service-choice-ui/service-choice-layout.component';
import { RouterModule } from '@angular/router';
import { AppButtonModule } from '../../shared/app-button-wrapper/app-button.module';
import { ServiceChoiceWrapperComponent } from '../../components/wrappers/service-choice-wrapper/service-choice-wrapper.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    ServiceChoiceLayoutComponent,
    ServiceChoiceWrapperComponent
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    RouterModule.forChild([
      { path: '', component: ServiceChoiceWrapperComponent }
    ]),
  ]
})
export class ServiceChoicePageModule { }
