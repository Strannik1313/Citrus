import {
	Component,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	Input,
	OnInit,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { CalendarDates } from '@models/calendar-dates';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import weekday from 'dayjs/plugin/weekday';
import dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.locale('ru');
dayjs.extend(weekday);
dayjs.extend(dayOfYear);

let daysNumbers = [0, 1, 2, 3, 4, 5, 6];

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
	@Input() calendarActiveDates: Array<Date> = [];
	@Output() dateChoisen: EventEmitter<Date> = new EventEmitter();
	@Output() dateRangeChoisen: EventEmitter<{ startDay: Date; endDay: Date }> =
		new EventEmitter();
	private startDay: Dayjs = dayjs();
	private endDay: Dayjs = dayjs();
	private today: Dayjs = dayjs(
		new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate(),
		),
	);
	public choisenDate: Dayjs | null = null;
	public week: Array<CalendarDates> = [];
	ngOnInit(): void {
		this.startDay = this.today.subtract(this.today.weekday(), 'day');
		this.endDay = this.today.add(6, 'day');
		this.week = this.getWeek(this.startDay);
		this.dateRangeChoisen.emit({
			startDay: this.startDay.toDate(),
			endDay: this.endDay.toDate(),
		});
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.week = this.week.map(day => {
			return {
				...day,
				disabled:
					changes.calendarActiveDates?.currentValue.filter((value: Date) => {
						return dayjs(value).dayOfYear() === dayjs(day.date).dayOfYear();
					}).length === 0 || day.date.isBefore(this.today),
			};
		});
	}
	getWeek(startDay: Dayjs): Array<CalendarDates> {
		return daysNumbers.map(value => {
			return {
				date: dayjs(startDay).add(value, 'day'),
				disabled: false,
			};
		});
	}
	onBtnClick(value: boolean): void {
		value
			? (this.week = this.getWeek(this.startDay.add(7, 'day')))
			: (this.week = this.getWeek(this.startDay.subtract(7, 'day')));
		this.startDay = this.week[0].date;
		this.dateRangeChoisen.emit({
			startDay: this.startDay.toDate(),
			endDay: dayjs(this.startDay).add(6, 'day').toDate(),
		});
	}
	onDateClick(day: Dayjs): void {
		this.choisenDate = day;
		this.dateChoisen.emit(day.toDate());
	}
}
