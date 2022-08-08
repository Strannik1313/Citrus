import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CalendarDates } from '@models/calendar-dates';
import dayjs from 'dayjs';

@Component({
	selector: 'app-calendar-cell',
	templateUrl: './calendar-cell.component.html',
	styleUrls: ['./calendar-cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCellComponent {
	@Input() day: CalendarDates = { date: dayjs(new Date()), disabled: false };
}
