import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecChoiceLayoutComponent } from './spec-choice-layout/spec-choice-layout.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    SpecChoiceLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SpecChoiceLayoutComponent}
    ]),
    MatButtonModule
  ]
})
export class SpecChoicePageModule { }
