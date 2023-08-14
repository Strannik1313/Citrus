import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';
import { CALENDAR_BUTTON_LABELS } from '@shared/calendar/enums/CALENDAR_BUTTON_LABELS';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
	@Input() dates: Array<CalendarDatesDto> | null = [];
	@Input() preselectedDate: string | null = null;
	@Input() prevWeekBtnDisabled: boolean | null = null;
	@Input() nextWeekBtnDisabled: boolean | null = null;
	@Output() onDayChange: EventEmitter<string> = new EventEmitter();
	@Output() onWeekChange: EventEmitter<CalendarChangeWeekEnum> = new EventEmitter();

	BUTTON_LABELS: typeof CALENDAR_BUTTON_LABELS = CALENDAR_BUTTON_LABELS;

	onNextWeekClick(): void {
		this.onWeekChange.emit(CalendarChangeWeekEnum.INCREASE);
	}

	onPrevWeekClick(): void {
		this.onWeekChange.emit(CalendarChangeWeekEnum.DECREASE);
	}

	onDateClick(day: CalendarDatesDto): void {
		if (!day.mastersId || day?.mastersId?.length === 0) {
			return;
		}
		this.onDayChange.emit(day.date);
	}

	trackByFn(index: number, item: CalendarDatesDto): string {
		return item.date;
	}
}
