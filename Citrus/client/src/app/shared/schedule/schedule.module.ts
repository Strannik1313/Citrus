import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '@shared/schedule/schedule.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
	declarations: [ScheduleComponent, TimepickerComponent],
	imports: [CommonModule, MatCardModule, DirectivesModule],
	exports: [ScheduleComponent],
})
export class ScheduleModule {}
