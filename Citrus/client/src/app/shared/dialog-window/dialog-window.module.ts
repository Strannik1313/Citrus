import { DialogWindowComponent } from './dialog-window.component';
import { AppButtonGroupModule } from '../app-button-group/app-button-group.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [DialogWindowComponent],
	imports: [CommonModule, AppButtonGroupModule],
	exports: [DialogWindowComponent],
})
export class DialogWindowModule {}
