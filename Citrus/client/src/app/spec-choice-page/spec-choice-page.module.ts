import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecChoiceLayoutComponent } from './spec-choice-wrapper/spec-choice-layout/spec-choice-layout.component';
import { RouterModule } from '@angular/router';
import { AppButtonModule } from '../shared/app-button-wrapper/app-button.module';
import { SpecChoiceWrapperComponent } from './spec-choice-wrapper/spec-choice-wrapper.component';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    SpecChoiceLayoutComponent,
    SpecChoiceWrapperComponent
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    MatCardModule,
    MatListModule,
    RouterModule.forChild([
      {path: '', component: SpecChoiceWrapperComponent}
    ]),
 
  ]
  
})
export class SpecChoicePageModule { }
