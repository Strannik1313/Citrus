import {
	Component,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	Input,
} from '@angular/core';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
	@Input() calendarDates: Array<Date> = [];
	@Input() choisenDate: Date | null = null;
	@Output() dateChoisen: EventEmitter<Date> = new EventEmitter();

	onDateClick(date: Date): void {
		this.choisenDate = date;
		this.dateChoisen.emit(date);
	}
}
