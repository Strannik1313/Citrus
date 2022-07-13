import { DialogWindowComponent } from './dialog-window.component'
import { AppButtonModule } from '../app-button-wrapper/app-button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DialogWindowComponent
  ],
  imports: [
    CommonModule,
    AppButtonModule,
    AppButtonModule
  ],
  exports: [
    DialogWindowComponent
  ]
})
export class DialogWindowModule { }
