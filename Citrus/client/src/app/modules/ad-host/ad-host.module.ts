import { AdHostDirective } from '../../directives/ad-host';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AdHostDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdHostDirective
  ]
})
export class AdHostModule { }
