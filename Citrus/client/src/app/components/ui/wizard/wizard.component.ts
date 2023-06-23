import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MasterDto } from '@models/MasterDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Store } from '@ngrx/store';
import {
	selectComponentsIsLoadingState,
	selectScheduleSelectedTime,
	WizardFeature,
} from '@components/ui/wizard/state-management/wizard.reducer';
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
} from '@components/ui/wizard/state-management/wizard.actions';
import { ServiceDto } from '@models/ServiceDto';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';
import { Schedule } from '@models/Schedule';
import { BUTTON_LABELS } from '@enums/ButtonLabels';
import { ComponentsLoadingState } from '@models/ComponentsLoadingState';
import { ConfirmForm } from '@models/ConfirmForm';

dayjs.locale('ru');

const STEPS_QUATITY = [1, 2, 3];

export enum WizardStepperEnum {
	SERVICE_CHOICE = 1,
	DATE_CHOICE = 2,
	CONFIRM_PAGE = 3,
	DONE = 4,
}

@Component({
	selector: 'app-wizard',
	templateUrl: './wizard.component.html',
	styleUrls: ['./wizard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent implements OnInit, OnDestroy {
	public WizardStepperEnum: typeof WizardStepperEnum = WizardStepperEnum;
	public stepsQuantity: BehaviorSubject<Array<number>> = new BehaviorSubject(STEPS_QUATITY);
	public BUTTON_LABELS: typeof BUTTON_LABELS = BUTTON_LABELS;
	private updatedPhone: BehaviorSubject<string> = new BehaviorSubject<string>('');
	private subscription: Subscription = new Subscription();
	stepsQuantity$ = this.stepsQuantity.asObservable();
	updatedPhone$ = this.updatedPhone.asObservable();
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

	constructor(private router: Router, private store: Store) {}

	ngOnInit() {
		this.currentStep$ = this.store.select(WizardFeature.selectStep);
		this.services$ = this.store.select(WizardFeature.selectServices);
		this.fwdBtnDisabled$ = this.store.select(WizardFeature.selectFwdBtnDisabled);
		this.selectedService$ = this.store.select(WizardFeature.selectSelectedService);
		this.masters$ = this.store.select(WizardFeature.selectMasters);
		this.dates$ = this.store.select(WizardFeature.selectDates);
		this.schedules$ = this.store.select(WizardFeature.selectSchedules);
		this.months$ = this.store.select(WizardFeature.selectMonths);
		this.selectedMonth$ = this.store.select(WizardFeature.selectSelectedMonth);
		this.prevWeekBtnDisabled$ = this.store.select(WizardFeature.selectPrevWeekBtnDisabled);
		this.selectedSchedule$ = this.store.select(WizardFeature.selectSelectedSchedule);
		this.selectedScheduleTime$ = this.store.select(selectScheduleSelectedTime);
		this.selectedMaster$ = this.store.select(WizardFeature.selectSelectedMaster);
		this.selectedDay$ = this.store.select(WizardFeature.selectSelectedDay);
		this.componentsLoadingState$ = this.store.select(selectComponentsIsLoadingState);
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

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onServiceStepInputChange(service: string | null) {
		this.store.dispatch(getServices({ payload: service }));
	}

	scheduleSelected(schedule: Schedule) {
		this.store.dispatch(setSelectedSchedule({ payload: schedule }));
	}

	onFormSubmit(formValue: ConfirmForm) {
		this.store.dispatch(setOrder({ payload: formValue }));
	}
}
