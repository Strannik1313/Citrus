import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from './app-button/app-button.component';
import { MatButtonModule } from '@angular/material/button';
import { ButtonGroupComponent } from './app-button-group/app-button-group.component';
import { AppButtonWrapperComponent } from './app-button-wrapper/app-button-wrapper.component';



@NgModule({
  declarations: [
    AppButtonComponent,
    AppButtonWrapperComponent,
    ButtonGroupComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    AppButtonWrapperComponent,
    ButtonGroupComponent
  ]
})
export class AppButtonGroupModule { }
