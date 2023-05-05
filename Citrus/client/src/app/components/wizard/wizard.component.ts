import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { BTN_LABELS } from '@constants/btn-labels';
import { Client, ClientConfirmStep } from '@models/client';
import { CLIENT_INIT_CONFIRM, CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { ApiService } from '@services/api.service';
import { MasterDto } from '@models/MasterDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { WizardHelper } from '@components/wizard/wizard-helper';
import { BtnStatus, CALENDAR_BTN_INIT_VALUE } from '@models/buttons-status';
import { ScheduleDto } from '@models/ScheduleDto';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { FormControlStatus } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WizardFeature } from '@components/wizard/state-management/wizard.reducer';
import {
	decrementWizardStep,
	getServices,
	incrementWizardStep,
	setSelectedSchedule,
	setSelectedDay,
	setSelectedService,
	setSelectedMaster,
	setSelectedMonth,
	getNextWeek,
	getPrevWeek,
} from '@components/wizard/state-management/wizard.actions';
import { ServiceDto } from '@models/ServiceDto';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';

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
	public nextBtnLabel: string = BTN_LABELS.next;
	public backBtnLabels: string = BTN_LABELS.back;
	public stepsQuantity: BehaviorSubject<Array<number>> = new BehaviorSubject(STEPS_QUATITY);
	private client: BehaviorSubject<Client> = new BehaviorSubject<Client>(CLIENT_INIT_VALUE);
	public selectedDay: string | null = null;
	private isClientValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private calendarBtnConf: BehaviorSubject<BtnStatus> = new BehaviorSubject<BtnStatus>(CALENDAR_BTN_INIT_VALUE);
	private updatedPhone: BehaviorSubject<string> = new BehaviorSubject<string>('');
	private startWeekDay = '';
	private selectedMonth: string | null = null;
	private confirmFormValue: ClientConfirmStep = CLIENT_INIT_CONFIRM;
	private subscription: Subscription = new Subscription();
	calendarBtnConf$ = this.calendarBtnConf.asObservable();
	isClientValid$ = this.isClientValid.asObservable();
	client$ = this.client.asObservable();
	stepsQuantity$ = this.stepsQuantity.asObservable();
	updatedPhone$ = this.updatedPhone.asObservable();
	currentStep$: Observable<number> = new Observable<number>();
	services$: Observable<ServiceDto[]> = new Observable<ServiceDto[]>();
	fwdBtnDisabled$: Observable<boolean> = new Observable<boolean>();
	selectedService$: Observable<ServiceDto | null> = new Observable<ServiceDto>();
	masters$: Observable<MasterDto[] | null> = new Observable<MasterDto[]>();
	dates$: Observable<CalendarDatesDto[] | null> = new Observable<CalendarDatesDto[]>();
	schedules$: Observable<ScheduleDto[] | null> = new Observable<ScheduleDto[]>();
	months$: Observable<string[] | null> = new Observable<string[]>();

	constructor(private router: Router, private apiService: ApiService, private store: Store) {}

	ngOnInit() {
		this.store.dispatch(getServices({ payload: null }));
		this.currentStep$ = this.store.select(WizardFeature.selectStep);
		this.services$ = this.store.select(WizardFeature.selectServices);
		this.fwdBtnDisabled$ = this.store.select(WizardFeature.selectFwdBtnDisabled);
		this.selectedService$ = this.store.select(WizardFeature.selectSelectedService);
		this.masters$ = this.store.select(WizardFeature.selectMasters);
		this.dates$ = this.store.select(WizardFeature.selectDates);
		this.schedules$ = this.store.select(WizardFeature.selectSchedules);
		this.months$ = this.store.select(WizardFeature.selectMonths);
	}

	onFormChange(observable: Observable<ClientConfirmStep>): void {
		this.subscription.add(
			observable.subscribe(formValue => {
				this.updatedPhone.next(WizardHelper.updatePhoneNumber(formValue.phoneNumber));
				this.confirmFormValue = formValue;
			}),
		);
	}

	onFormStatusChange(observable: Observable<FormControlStatus>): void {
		this.subscription.add(
			observable.subscribe(status => {
				if (status === 'VALID') {
					this.client.next({
						...this.client.value,
						...this.confirmFormValue,
					});
				} else {
					this.client.next({
						...this.client.value,
						...CLIENT_INIT_CONFIRM,
					});
				}
			}),
		);
	}

	onServiceChange(value: ServiceDto): void {
		this.store.dispatch(setSelectedService({ payload: value }));
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
		// this.selectedDay = null;
		// this.client.next({
		// 	...this.client.value,
		// 	dateOrder: null,
		// });
		// this.startWeekDay = dayjs(event.startDay).add(event.increase, 'week').toString();
		// if (this.client.value.serviceId !== null) {
		// 	this.dates$ = this.apiService
		// 		.getDates(
		// 			this.client.value.serviceId,
		// 			dayjs(event.startDay).add(event.increase, 'week').toString(),
		// 			this.client.value.masterId,
		// 		)
		// 		.pipe(
		// 			tap(dates => {
		// 				this.calendarBtnConf.next(WizardHelper.getCalendarBtnConf(dates[0].date, this.selectedMonth));
		// 			}),
		// 		);
		// }
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

	onTimeChange(choisenDate: ScheduleDto): void {
		this.store.dispatch(setSelectedSchedule({ payload: choisenDate }));
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
}
