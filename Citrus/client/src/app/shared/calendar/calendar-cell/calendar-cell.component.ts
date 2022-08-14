import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

@Component({
	selector: 'app-calendar-cell',
	templateUrl: './calendar-cell.component.html',
	styleUrls: ['./calendar-cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarCellComponent {
	@Input() day: Dayjs = dayjs();
}
