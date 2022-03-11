import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecChoiceLayoutComponent } from './spec-choice-layout/spec-choice-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SpecChoiceLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SpecChoiceLayoutComponent}
    ])
  ]
})
export class SpecChoicePageModule { }
