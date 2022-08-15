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
import { BtnStatus, CALENDAR_BTN_INIT_VALUE } from '@models/buttons-status';
import { CalendarWeekChange } from '@models/calendar-week-change';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
	@Input() activeDates: Array<string> = [];
	@Input() selectedMonth: Dayjs | null = null;
	@Input() disabledBtn: BtnStatus = CALENDAR_BTN_INIT_VALUE;
	@Output() onDaySelected: EventEmitter<Dayjs> = new EventEmitter();
	@Output() onWeekChange: EventEmitter<CalendarWeekChange> = new EventEmitter();
	private today: Dayjs = dayjs().startOf('day');
	public week: Array<Dayjs> = [];
	public selectedDate: Dayjs | null = null;
	ngOnInit(): void {
		this.week = this.createWeek(dayjs().startOf('week'));
		this.onWeekChange.emit({
			startDay: this.week[0],
			endDay: this.week[6],
			today: this.today,
		});
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (!!changes.selectedMonth?.currentValue) {
			const curr = changes.selectedMonth.currentValue;
			if (!curr.isSame(this.week[0], 'week')) {
				this.week = this.createWeek(curr.startOf('week'));
				this.onWeekChange.emit({
					startDay: this.week[0],
					endDay: this.week[6],
					today: this.today,
				});
			}
		}
	}
	private createWeek(startDay: Dayjs): Array<Dayjs> {
		const week = [];
		if (startDay.isBefore(this.today, 'day')) {
			startDay = this.today.startOf('week');
		}
		for (let i = 0; i <= 6; i++) {
			week.push(startDay.add(i, 'day'));
		}
		return week;
	}
	setPrevWeek(): void {
		this.selectedDate = null;
		this.week = this.createWeek(this.week[0].subtract(1, 'week'));
		this.onWeekChange.emit({
			startDay: this.week[0],
			endDay: this.week[0].add(6, 'day'),
			today: this.today,
		});
	}
	setNextWeek(): void {
		this.selectedDate = null;
		this.week = this.createWeek(this.week[0].add(1, 'week'));
		this.onWeekChange.emit({
			startDay: this.week[0],
			endDay: this.week[0].add(6, 'day'),
			today: this.today,
		});
	}
	onDateClick(day: Dayjs): void {
		this.selectedDate = day;
		this.onDaySelected.emit(day);
	}
	trackByFn(index: number, item: Dayjs): Dayjs {
		return item;
	}
}
