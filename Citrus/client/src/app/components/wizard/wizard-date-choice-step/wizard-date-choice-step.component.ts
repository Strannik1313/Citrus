import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { Client } from '@models/client';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { MasterDto } from '@models/MasterDto';
import { ScheduleDto } from '@models/ScheduleDto';
import { FilterItem } from '@shared/filter-dropdown/interfaces/FilterItem';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';

@Component({
	selector: 'app-wizard-date-choice-step',
	templateUrl: './wizard-date-choice-step.component.html',
	styleUrls: ['./wizard-date-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardDateChoiceStepComponent {
	@Input() client: Client | null = CLIENT_INIT_VALUE;
	@Input() masters: Array<MasterDto> | null = [];
	@Input() months: Array<string> | null = [];
	@Input() dates: Array<CalendarDatesDto> | null = [];
	@Input() prevWeekBtnDisabled: boolean | null = null;
	@Input() schedules: Array<ScheduleDto> | null = null;
	@Input() selectedDay: string | null = null;
	@Input() selectedMonth: string | null = null;
	@Output() onWeekChange: EventEmitter<CalendarChangeWeekEnum> = new EventEmitter();
	@Output() onMasterChange: EventEmitter<MasterDto | null> = new EventEmitter();
	@Output() onDayChange: EventEmitter<string> = new EventEmitter();
	@Output() onMonthChange: EventEmitter<string | null> = new EventEmitter();
	@Output() onTimeChange: EventEmitter<ScheduleDto> = new EventEmitter();

	onDaySelected(date: string): void {
		this.onDayChange.emit(date);
	}

	weekChange(event: CalendarChangeWeekEnum): void {
		this.onWeekChange.emit(event);
	}

	onMasterFilterChange(filterValue: FilterItem | string | number | null): void {
		let selectedMaster = filterValue as MasterDto;
		this.onMasterChange.emit(selectedMaster);
	}

	onMonthFilterChange(month: FilterItem | string | number | null): void {
		let selectedMonth = month as string;
		this.onMonthChange.emit(selectedMonth);
	}

	timeChange(choisenDate: ScheduleDto): void {
		this.onTimeChange.emit(choisenDate);
	}
}
