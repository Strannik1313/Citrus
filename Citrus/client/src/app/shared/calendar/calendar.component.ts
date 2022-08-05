import {
	Component,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	Input,
	OnInit,
} from '@angular/core';
import * as dayjs from 'dayjs';
dayjs().format();

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
	@Input() calendarActiveDates: Array<Date> = [];
	@Input() choisenDate: Date | null = null;
	@Output() dateChoisen: EventEmitter<Date> = new EventEmitter();
	private today: Date = new Date();
	public week: Array<Date> = [];
	ngOnInit(): void {
		let startDay = dayjs(this.today).subtract(
			dayjs(this.today).day() - 1,
			'day',
		);
		startDay;
		// for (let i = 1; i <= dayjs(this.today).day(); i++) {
		// 	this.week.push(
		// 		dayjs(this.today)
		// 			.subtract(dayjs(this.today).day() - i, 'day')
		// 			.toDate(),
		// 	);
		// }
		// for (let i = dayjs(this.today).day() + 1; i <= 7; i++) {
		// 	this.week.push(
		// 		dayjs(this.today)
		// 			.add(i - dayjs(this.today).day(), 'day')
		// 			.toDate(),
		// 	);
		// }
	}
	onDateClick(day: Date): void {
		this.choisenDate = day;
		this.dateChoisen.emit(day);
	}
}
