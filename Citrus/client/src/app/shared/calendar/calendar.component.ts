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
	@Input() calendarData: Array<Date> = [];
	@Input() isChoisen: Date = new Date();
	@Output() dateChoisen: EventEmitter<Date> = new EventEmitter();

	onDateClick(date: Date): void {
		this.isChoisen = date;
		this.dateChoisen.emit(date);
	}
}
