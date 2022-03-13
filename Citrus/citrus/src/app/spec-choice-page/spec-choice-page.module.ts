import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecChoiceLayoutComponent } from './spec-choice-layout/spec-choice-layout.component';
import { RouterModule } from '@angular/router';
import { AppButtonModule } from '../shared/app-button/app-button.module';



@NgModule({
  declarations: [
    SpecChoiceLayoutComponent
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    RouterModule.forChild([
      {path: '', component: SpecChoiceLayoutComponent}
    ]),
 
  ]
})
export class SpecChoicePageModule { }
