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
	@Output() onDaySelected: EventEmitter<string> = new EventEmitter();
	@Output() onWeekChange: EventEmitter<{ startDay: string; endDay: string }> =
		new EventEmitter();
	private today: Dayjs = dayjs().startOf('day');
	public isPrevDisabled: boolean = false;
	public isNextDisabled: boolean = false;
	public week: Array<string> = [];
	public selectedDate: string | null = null;
	ngOnInit(): void {
		this.isPrevDisabled = true;
		this.week = this.createWeek(dayjs().startOf('week'));
		this.onWeekChange.emit({
			startDay: this.week[0],
			endDay: this.week[6],
		});
	}
	ngOnChanges(changes: SimpleChanges): void {
		for (const prop in changes) {
			switch (prop) {
				case 'selectedMonth':
					if (changes.selectedMonth.currentValue !== null) {
						const curr = changes.selectedMonth.currentValue;
						const firstChng = changes.selectedMonth.firstChange;
						if (!curr.isSame(this.week[0], 'week') && !firstChng) {
							this.week = this.createWeek(curr.startOf('week'));
							this.onWeekChange.emit({
								startDay: this.week[0],
								endDay: this.week[6],
							});
						}
						this.isPrevDisabled = true;
					} else {
						this.isPrevDisabled = false;
						this.isNextDisabled = false;
					}
					break;
				default:
					break;
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
	setWeek(inc: number): void {
		this.selectedDate = null;
		this.week = this.createWeek(dayjs(this.week[0]).add(inc, 'week'));
		this.isPrevDisabled = dayjs(this.week[0]).isBefore(this.today, 'day')
			? true
			: false;
		if (this.selectedMonth !== null) {
			this.isNextDisabled = dayjs(this.week[6]).isAfter(
				this.selectedMonth,
				'month',
			)
				? true
				: false;
			this.isPrevDisabled = dayjs(this.week[0]).isBefore(
				this.selectedMonth,
				'month',
			)
				? true
				: false;
		}

		this.onWeekChange.emit({
			startDay: this.week[0],
			endDay: dayjs(this.week[0]).add(6, 'day').toString(),
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
