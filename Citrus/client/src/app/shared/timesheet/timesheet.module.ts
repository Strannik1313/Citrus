import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from '@shared/timesheet/timesheet.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [TimesheetComponent, TimepickerComponent],
	imports: [CommonModule, MatCardModule],
	exports: [TimesheetComponent],
})
export class TimesheetModule {}
