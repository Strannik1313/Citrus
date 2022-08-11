import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from '@shared/timesheet/timesheet.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayListModule } from '@shared/overlay-list/overlay-list.module';

@NgModule({
	declarations: [TimesheetComponent, TimepickerComponent],
	imports: [CommonModule, OverlayModule, OverlayListModule],
	exports: [TimesheetComponent],
})
export class TimesheetModule {}
