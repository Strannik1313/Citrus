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
import dayjs from 'dayjs';
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
	private startDay: Date = new Date();
	private endDay: Date = new Date();
	private today: Date = new Date(
		new Date().getFullYear(),
		new Date().getMonth(),
		new Date().getDate(),
	);
	public week: Array<CalendarDates> = [];
	public selectedDate: Date | null = null;
	ngOnInit(): void {
		this.startDay = dayjs(this.today)
			.subtract(dayjs(this.today).weekday(), 'day')
			.toDate();
		this.endDay = dayjs(this.today).add(6, 'day').toDate();
		this.week = this.getWeek(this.startDay);
		this.dateRangeChoisen.emit({
			startDay: this.startDay,
			endDay: this.endDay,
		});
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.week = this.week.map(day => {
			return {
				...day,
				disabled:
					true &&
					!changes.calendarActiveDates?.currentValue.find((value: Date) => {
						return dayjs(value).dayOfYear() === dayjs(day.date).dayOfYear();
					}),
			};
		});
	}
	getWeek(startDay: Date): Array<CalendarDates> {
		return daysNumbers.map(value => {
			return {
				date: dayjs(startDay).add(value, 'day').toDate(),
				disabled: false,
			};
		});
	}
	onBtnClick(value: boolean): void {
		value
			? (this.week = this.getWeek(dayjs(this.startDay).add(7, 'day').toDate()))
			: (this.week = this.getWeek(
					dayjs(this.startDay).subtract(7, 'day').toDate(),
			  ));
		this.startDay = this.week[0].date;
		this.dateRangeChoisen.emit({
			startDay: this.startDay,
			endDay: dayjs(this.startDay).add(6, 'day').toDate(),
		});
		this.selectedDate = null;
	}
	onDateClick(day: Date, disabled: boolean): void {
		if (!disabled) {
			this.selectedDate = day;
			this.dateChoisen.emit(day);
		}
	}
}
