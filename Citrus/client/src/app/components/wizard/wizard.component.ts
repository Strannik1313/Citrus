import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { NAVIGATE_ROUTES } from '@constants/navigate-routes';
import { BTN_LABELS } from '@constants/btn-labels';
import { ChoisenService, Client } from '@models/client';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { ApiService } from '@services/api.service';
import { Master } from '@models/master';
import { CalendarDates } from '@models/calendar-dates';
import { WizardHelper } from '@components/wizard/wizar-helper';
import { BtnStatus, CALENDAR_BTN_INIT_VALUE } from '@models/buttons-status';
import { Timesheet } from '@models/timesheet';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

const WIZARD_STEPPER = {
	serviceChoice: 1,
	dateChoice: 2,
	confirmPage: 3,
	done: 4,
};
const STEPS_QUATITY = [1, 2, 3];

enum WizardStepperEnum {
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
export class WizardComponent implements OnInit {
	public months: Array<string> = [];
	public stepsQuantity: Array<number> = STEPS_QUATITY;
	public wizardStepper = WIZARD_STEPPER;
	public WizardStepperEnum: typeof WizardStepperEnum = WizardStepperEnum;
	public currentStep: WizardStepperEnum = WizardStepperEnum.SERVICE_CHOICE;
	public nextBtnLabel: string = BTN_LABELS.next;
	public backBtnLabels: string = BTN_LABELS.back;
	public isStepDone = false;
	public services$;
	public masters$: Observable<Master[]> | undefined;
	public timesheets$: Observable<Timesheet[]> | undefined;
	public dates$: Observable<CalendarDates[]> | undefined;
	private client: BehaviorSubject<Client> = new BehaviorSubject<Client>(
		CLIENT_INIT_VALUE,
	);
	private calendarBtnConf: BehaviorSubject<BtnStatus> =
		new BehaviorSubject<BtnStatus>(CALENDAR_BTN_INIT_VALUE);
	private timeInterval: BehaviorSubject<Array<string>> = new BehaviorSubject<
		Array<string>
	>([]);
	private startWeekDay: string = '';
	private selectedDay: string | null = null;
	private selectedMonth: string | null = null;
	constructor(
		private router: Router,
		private storage: StorageService,
		private apiService: ApiService,
	) {
		this.services$ = apiService.getServices();
	}
	ngOnInit(): void {
		this.months = WizardHelper.getMonth();
	}
	calendarBtnConf$ = this.calendarBtnConf.asObservable();
	client$ = this.client.asObservable();
	timeInterval$ = this.timeInterval.asObservable();
	firstStepDone(value: ChoisenService): void {
		this.client.next({ ...this.client.value, ...value });
		this.isStepDone = true;
	}
	onWeekChange(event: { startDay: string; increase: number }): void {
		this.selectedDay = null;
		this.timesheets$ = of([]);
		this.startWeekDay = dayjs(event.startDay)
			.add(event.increase, 'week')
			.toString();
		if (this.client.value.serviceId !== null) {
			this.dates$ = this.apiService
				.getDates(
					this.client.value.serviceId,
					dayjs(event.startDay).add(event.increase, 'week').toString(),
					this.client.value.masterId,
				)
				.pipe(
					tap(dates => {
						this.calendarBtnConf.next(
							WizardHelper.getCalendarBtnConf(
								dates[0].date,
								this.selectedMonth,
							),
						);
					}),
				);
		}
	}
	onMasterChange(id: number | null) {
		this.client.value.masterId = id;
		if (this.client.value.serviceId !== null) {
			this.dates$ = this.apiService
				.getDates(
					this.client.value.serviceId,
					dayjs(this.startWeekDay).toString(),
					this.client.value.masterId,
				)
				.pipe(
					tap(dates => {
						this.calendarBtnConf.next(
							WizardHelper.getCalendarBtnConf(
								dates[0].date,
								this.selectedMonth,
							),
						);
					}),
				);
		}
		if (!!this.selectedDay && this.client.value.serviceId !== null) {
			this.timesheets$ = this.apiService
				.getTimesheets(
					this.client.value.serviceId,
					this.selectedDay,
					this.client.value.masterId,
				)
				.pipe(
					tap(timesheets => {
						this.timeInterval.next(
							WizardHelper.getExtraTimeInterval(timesheets),
						);
					}),
				);
		}
	}
	onDayChange(date: string | null): void {
		this.selectedDay = date;
		if (this.client.value.serviceId !== null) {
			this.timesheets$ = this.apiService
				.getTimesheets(
					this.client.value.serviceId,
					date,
					this.client.value.masterId,
				)
				.pipe(
					tap(timesheets => {
						this.timeInterval.next(
							WizardHelper.getExtraTimeInterval(timesheets),
						);
					}),
				);
		}
	}
	onMonthChange(month: string | null): void {
		this.selectedMonth = month;
		this.selectedDay = null;
		this.startWeekDay = dayjs(month).startOf('week').toString();
		this.timesheets$ = of([]);
		if (this.client.value.serviceId !== null && month !== null) {
			this.dates$ = this.apiService
				.getDates(
					this.client.value.serviceId,
					dayjs(month).toString(),
					this.client.value.masterId,
				)
				.pipe(
					tap(dates => {
						this.calendarBtnConf.next(
							WizardHelper.getCalendarBtnConf(
								dates[0].date,
								this.selectedMonth,
							),
						);
					}),
				);
		} else {
			this.calendarBtnConf.next(
				WizardHelper.getCalendarBtnConf(this.startWeekDay, month),
			);
		}
	}
	onBtnClick(isNextStep: boolean): void {
		if (isNextStep) {
			this.currentStep += 1;
		} else {
			this.currentStep -= 1;
		}
		this.isStepDone = false;
		switch (this.currentStep) {
			case WizardStepperEnum.SERVICE_CHOICE:
				break;
			case WizardStepperEnum.DATE_CHOICE:
				this.nextBtnLabel = BTN_LABELS.next;
				this.masters$ = this.apiService.getMasters(
					this.client.value.serviceId,
					this.client.value.masterId,
				);
				if (this.client.value.serviceId !== null) {
					this.startWeekDay = dayjs().startOf('week').toString();
					this.dates$ = this.apiService
						.getDates(
							this.client.value.serviceId,
							dayjs().toString(),
							this.client.value.masterId,
						)
						.pipe(
							tap(dates => {
								this.calendarBtnConf.next(
									WizardHelper.getCalendarBtnConf(
										dates[0].date,
										this.selectedMonth,
									),
								);
							}),
						);
				}
				break;
			case WizardStepperEnum.CONFIRM_PAGE:
				this.nextBtnLabel = BTN_LABELS.confirm;
				break;
			case WizardStepperEnum.DONE:
				this.router.navigate([NAVIGATE_ROUTES.home]);
				break;
			default:
				this.router.navigate([NAVIGATE_ROUTES.home]);
				break;
		}
	}
	ngOnDestroy(): void {
		this.storage.resetClient();
	}
}
