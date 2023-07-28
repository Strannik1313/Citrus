import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterDto } from '@models/MasterDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { Store } from '@ngrx/store';
import {
	selectComponentsIsLoadingState,
	selectDates,
	selectFwdBtnDisabled,
	selectIsNextBTnVisible,
	selectMasters,
	selectMonths,
	selectPrevWeekBtnDisabled,
	selectSchedules,
	selectScheduleSelectedTime,
	selectSelectedDay,
	selectSelectedMaster,
	selectSelectedMonth,
	selectSelectedSchedule,
	selectSelectedService,
	selectServices,
	selectStep,
} from '@state-management/wizard-feature/wizard.reducer';
import {
	decrementWizardStep,
	getNextWeek,
	getPrevWeek,
	getServices,
	incrementWizardStep,
	setOrder,
	setSelectedDay,
	setSelectedMaster,
	setSelectedMonth,
	setSelectedSchedule,
	setSelectedService,
} from '@state-management/wizard-feature/wizard.actions';
import { ServiceDto } from '@models/ServiceDto';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';
import { Schedule } from '@interfaces/Schedule';
import { BUTTON_LABELS } from '@enums/ButtonLabels';
import { ComponentsLoadingState } from '@models/ComponentsLoadingState';
import { ConfirmForm } from '@interfaces/ConfirmForm';

export enum WizardStepperEnum {
	SERVICE_CHOICE = 1,
	DATE_CHOICE = 2,
	CONFIRM_PAGE = 3,
}

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit {
	public WizardStepperEnum: typeof WizardStepperEnum = WizardStepperEnum;
	public BUTTON_LABELS: typeof BUTTON_LABELS = BUTTON_LABELS;
	stepsQuantity = [1, 2, 3];
	currentStep$: Observable<number> = new Observable<number>();
	services$: Observable<ServiceDto[]> = new Observable<ServiceDto[]>();
	fwdBtnDisabled$: Observable<boolean> = new Observable<boolean>();
	selectedService$: Observable<ServiceDto | null> = new Observable<ServiceDto>();
	masters$: Observable<MasterDto[] | null> = new Observable<MasterDto[]>();
	dates$: Observable<CalendarDatesDto[] | null> = new Observable<CalendarDatesDto[]>();
	schedules$: Observable<Schedule[] | null> = new Observable<Schedule[]>();
	months$: Observable<string[] | null> = new Observable<string[]>();
	selectedMonth$: Observable<string | null> = new Observable<string>();
	prevWeekBtnDisabled$: Observable<boolean> = new Observable<boolean>();
	selectedSchedule$: Observable<Schedule | null> = new Observable<Schedule>();
	selectedScheduleTime$: Observable<string | null> = new Observable<string>();
	selectedMaster$: Observable<MasterDto | null> = new Observable<MasterDto>();
	selectedDay$: Observable<string | null> = new Observable<string>();
	componentsLoadingState$: Observable<ComponentsLoadingState | null> = new Observable<ComponentsLoadingState>();
	isFwdBtnVisible$: Observable<boolean | null> = new Observable<boolean>();

	constructor(private store: Store) {}

	ngOnInit() {
		this.currentStep$ = this.store.select(selectStep);
		this.services$ = this.store.select(selectServices);
		this.fwdBtnDisabled$ = this.store.select(selectFwdBtnDisabled);
		this.selectedService$ = this.store.select(selectSelectedService);
		this.masters$ = this.store.select(selectMasters);
		this.dates$ = this.store.select(selectDates);
		this.schedules$ = this.store.select(selectSchedules);
		this.months$ = this.store.select(selectMonths);
		this.selectedMonth$ = this.store.select(selectSelectedMonth);
		this.prevWeekBtnDisabled$ = this.store.select(selectPrevWeekBtnDisabled);
		this.selectedSchedule$ = this.store.select(selectSelectedSchedule);
		this.selectedScheduleTime$ = this.store.select(selectScheduleSelectedTime);
		this.selectedMaster$ = this.store.select(selectSelectedMaster);
		this.selectedDay$ = this.store.select(selectSelectedDay);
		this.componentsLoadingState$ = this.store.select(selectComponentsIsLoadingState);
		this.isFwdBtnVisible$ = this.store.select(selectIsNextBTnVisible);
	}

	onServiceChange(value: ServiceDto): void {
		this.store.dispatch(setSelectedService({ payload: value }));
	}

	timeChange(schedule: Schedule) {
		this.store.dispatch(setSelectedSchedule({ payload: schedule }));
	}

	onWeekChange(event: CalendarChangeWeekEnum): void {
		switch (event) {
			case CalendarChangeWeekEnum.DECREASE: {
				this.store.dispatch(getPrevWeek());
				break;
			}
			case CalendarChangeWeekEnum.INCREASE: {
				this.store.dispatch(getNextWeek());
				break;
			}
			default:
				throw Error('Данное значение CalendarChangeWeekEnum не обработано в switch-case');
		}
	}

	onMasterChange(master: MasterDto | null) {
		this.store.dispatch(setSelectedMaster({ payload: master }));
	}

	onDayChange(date: string): void {
		this.store.dispatch(setSelectedDay({ payload: date }));
	}

	onMonthChange(month: string | null): void {
		this.store.dispatch(setSelectedMonth({ payload: month }));
	}

	onBtnClick(isNextStep: boolean): void {
		if (isNextStep) {
			this.store.dispatch(incrementWizardStep());
		} else {
			this.store.dispatch(decrementWizardStep());
		}
	}

	onServiceStepInputChange(service: string | null) {
		this.store.dispatch(getServices({ payload: service }));
	}

	onFormSubmit(formValue: ConfirmForm) {
		this.store.dispatch(setOrder({ payload: formValue }));
	}
}
