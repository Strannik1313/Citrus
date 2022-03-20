import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from './app-button.component';
import { MatButtonModule } from '@angular/material/button';
import { AppButtonWrapperComponent } from '../app-button-wrapper.component';



@NgModule({
  declarations: [
    AppButtonComponent,
    AppButtonWrapperComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AppButtonWrapperComponent
  ]
})
export class AppButtonModule { }
