import { DialogWindowDirective } from './../../directives/dialog-window.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DialogWindowDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DialogWindowDirective
  ]
})
export class AdHostModule { }
