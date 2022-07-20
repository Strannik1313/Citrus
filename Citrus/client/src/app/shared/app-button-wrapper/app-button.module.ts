import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AppButtonComponent } from '@shared/app-button-wrapper/app-button/app-button.component';
import { AppButtonWrapperComponent } from '@shared/app-button-wrapper/app-button-wrapper.component';

@NgModule({
	declarations: [AppButtonComponent, AppButtonWrapperComponent],
	imports: [CommonModule, MatButtonModule],
	exports: [AppButtonWrapperComponent],
})
export class AppButtonModule {}
