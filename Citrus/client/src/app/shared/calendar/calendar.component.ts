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
	@Input() disabledBtn: {prev: boolean, next: false} = {prev: false, next: false};
	@Output() onDaySelected: EventEmitter<string> = new EventEmitter();
	@Output() onWeekChange: EventEmitter<{ startDay: string; endDay: string, today: string }> =
		new EventEmitter();
	private today: Dayjs = dayjs().startOf('day');
	public week: Array<string> = [];
	public selectedDate: string | null = null;
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
	private createWeek(startDay: Dayjs): Array<string> {
		const week = [];
		if (startDay.isBefore(this.today, 'day')) {
			startDay = this.today.startOf('week');
		}
		for (let i = 0; i <= 6; i++) {
			week.push(startDay.add(i, 'day').toString());
		}
		return week;
	}
	setPrevWeek(): void {
		this.selectedDate = null;
		this.week = this.createWeek(dayjs(this.week[0]).add(1, 'week'));
		this.onWeekChange.emit({
			startDay: this.week[0],
			endDay: dayjs(this.week[0]).add(6, 'day').toString(),
			today: this.today,
		});
	}
	setNextWeek(): void {
		this.selectedDate = null;
		this.week = this.createWeek(dayjs(this.week[0]).subtract(1, 'week'));
		this.onWeekChange.emit({
			startDay: this.week[0],
			endDay: dayjs(this.week[0]).add(6, 'day').toString(),
			today: this.today,
		});
	}
	onDateClick(day: string): void {
		this.selectedDate = day;
		this.onDaySelected.emit(day);
	}
	trackByFn(index: number, item: string): string {
		return item;
	}
}
