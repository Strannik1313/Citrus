import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from '@shared/timesheet/timesheet.component';
import { TimepickerComponent } from './timepicker/timepicker.component';

@NgModule({
	declarations: [TimesheetComponent, TimepickerComponent],
	imports: [CommonModule],
	exports: [TimesheetComponent],
})
export class TimesheetModule {}
