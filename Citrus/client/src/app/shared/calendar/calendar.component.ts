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
	@Output() dateChoisen: EventEmitter<Date> = new EventEmitter();
	public isChoisen: number | null = null;

	onDateClick(index: number): void {
		this.isChoisen = index;
		this.dateChoisen.emit(this.calendarData[index]);
	}
}
