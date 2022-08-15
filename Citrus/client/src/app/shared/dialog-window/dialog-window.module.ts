import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogWindowComponent } from '@shared/dialog-window/dialog-window.component';
import { AppButtonGroupModule } from '@shared/app-button-group/app-button-group.module';

@NgModule({
	declarations: [DialogWindowComponent],
	imports: [CommonModule, AppButtonGroupModule],
	exports: [DialogWindowComponent],
})
export class DialogWindowModule {}
