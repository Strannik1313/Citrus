import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from './app-button.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AppButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AppButtonComponent
  ]
})
export class AppButtonModule { }
