import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { BtnStatus } from '@models/buttons-status';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
	@Input() dates: Array<CalendarDatesDto> | null = [];
	@Input() preselectedDate: string | null = null;
	@Input() btnConf: BtnStatus | null = null;
	@Output() onDayChange: EventEmitter<string> = new EventEmitter();
	@Output() onWeekChange: EventEmitter<CalendarChangeWeekEnum> = new EventEmitter();

	onNextWeekClick(): void {
		this.onWeekChange.emit(CalendarChangeWeekEnum.INCREASE);
	}

	onPrevWeekClick(): void {
		this.onWeekChange.emit(CalendarChangeWeekEnum.DECREASE);
	}

	onDateClick(day: CalendarDatesDto): void {
		this.onDayChange.emit(day.date);
	}

	trackByFn(index: number, item: CalendarDatesDto): string {
		return item.date;
	}
}
