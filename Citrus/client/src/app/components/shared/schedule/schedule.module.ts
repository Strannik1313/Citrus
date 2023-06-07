import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '@shared/schedule/schedule.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '@directives/directives.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	declarations: [ScheduleComponent, TimepickerComponent],
	imports: [CommonModule, MatCardModule, DirectivesModule, MatSelectModule, MatButtonModule, OverlayModule],
	exports: [ScheduleComponent],
})
export class ScheduleModule {}
