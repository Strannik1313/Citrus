import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '@shared/schedule/schedule.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
	declarations: [ScheduleComponent, TimepickerComponent],
	imports: [CommonModule, MatCardModule],
	exports: [ScheduleComponent],
})
export class ScheduleModule {}
