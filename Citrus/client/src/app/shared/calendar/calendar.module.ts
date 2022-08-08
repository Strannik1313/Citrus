import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarCellComponent } from '@shared/calendar/calendar-cell/calendar-cell.component';
import { CalendarComponent } from '@shared/calendar/calendar.component';
import { DisableDateDirective } from './disable-date.directive';

@NgModule({
	declarations: [
		CalendarCellComponent,
		CalendarComponent,
		DisableDateDirective,
	],
	imports: [CommonModule],
	exports: [CalendarComponent],
})
export class CalendarModule {}
