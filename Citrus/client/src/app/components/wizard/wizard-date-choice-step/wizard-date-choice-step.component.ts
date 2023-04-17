import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { Client } from '@models/client';
import { CalendarDates } from '@models/calendar-dates';
import { Master } from '@models/master';
import { Schedule } from '@models/schedule';
import { BtnStatus } from '@models/buttons-status';

@Component({
	selector: 'app-wizard-date-choice-step',
	templateUrl: './wizard-date-choice-step.component.html',
	styleUrls: ['./wizard-date-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardDateChoiceStepComponent {
	@Input() client: Client | null = CLIENT_INIT_VALUE;
	@Input() masters: Array<Master> | null = [];
	@Input() months: Array<string> = [];
	@Input() dates: Array<CalendarDates> | null = [];
	@Input() btnConf: BtnStatus | null = null;
	@Input() schedules: Array<Schedule> | null = null;
	@Input() selectedDay: string | null = null;
	@Output() onWeekChange: EventEmitter<{
		startDay: string;
		increase: number;
	}> = new EventEmitter();
	@Output() onMasterChange: EventEmitter<Master | null> = new EventEmitter();
	@Output() onDayChange: EventEmitter<string> = new EventEmitter();
	@Output() onMonthChange: EventEmitter<string | null> = new EventEmitter();
	@Output() onTimeChange: EventEmitter<Schedule> = new EventEmitter();

	onDaySelected(date: string): void {
		this.onDayChange.emit(date);
	}

	weekChange(event: { startDay: string; increase: number }): void {
		this.onWeekChange.emit(event);
	}

	onMasterFilterChange(master: Master | null): void {
		this.onMasterChange.emit(master);
	}

	onMonthFilterChange(month: string | null): void {
		this.onMonthChange.emit(month);
	}

	timeChange(choisenDate: Schedule): void {
		this.onTimeChange.emit(choisenDate);
	}
}
