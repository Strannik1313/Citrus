import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@shared/calendar/calendar.component';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
	declarations: [CalendarComponent],
	imports: [CommonModule, DirectivesModule],
	exports: [CalendarComponent],
})
export class CalendarModule {}
