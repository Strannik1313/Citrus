import {
	Component,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	Input,
} from '@angular/core';
import { BtnStatus } from '@models/buttons-status';
import { CalendarDates } from '@models/calendar-dates';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
	@Input() dates: Array<CalendarDates> | null = [];
	@Input() btnConf: BtnStatus | null = null;
	@Output() onDayChange: EventEmitter<string> = new EventEmitter();
	@Output() onWeekChange: EventEmitter<{
		startDay: string;
		increase: number;
	}> = new EventEmitter();
	onChangeWeekClick(increase: number): void {
		if (!!this.dates) {
			this.onWeekChange.emit({
				startDay: this.dates[0].date,
				increase,
			});
		}
	}
	onDateClick(day: CalendarDates): void {
		this.onDayChange.emit(day.date);
	}
	trackByFn(index: number, item: CalendarDates): string {
		return item.date;
	}
}
