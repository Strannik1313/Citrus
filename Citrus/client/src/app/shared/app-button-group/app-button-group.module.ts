import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ButtonGroupComponent } from '@shared/app-button-group/app-button-group.component';
import { AppButtonModule } from '@shared/app-button-wrapper/app-button.module';
import { AppButtonWrapperComponent } from '@shared/app-button-wrapper/app-button-wrapper.component';

@NgModule({
	declarations: [ButtonGroupComponent],
	imports: [CommonModule, MatButtonModule, AppButtonModule],
	exports: [AppButtonWrapperComponent, ButtonGroupComponent],
})
export class AppButtonGroupModule {}
