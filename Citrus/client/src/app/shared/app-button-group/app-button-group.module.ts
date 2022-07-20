import { ButtonGroupComponent } from './app-button-group.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AppButtonWrapperComponent } from '../app-button-wrapper/app-button-wrapper.component';
import { AppButtonModule } from '../app-button-wrapper/app-button.module';

@NgModule({
	declarations: [ButtonGroupComponent],
	imports: [CommonModule, MatButtonModule, AppButtonModule],
	exports: [AppButtonWrapperComponent, ButtonGroupComponent],
})
export class AppButtonGroupModule {}
