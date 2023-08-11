import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
	changeWizardStep,
	checkIsWizardAvailable,
	getDates,
	getMasters,
	getMonths,
	getSchedules,
	getServices,
	incrementWizardStep,
	initializeWizardConfirmStep,
	initializeWizardDateChoice,
	initializeWizardServiceChoice,
	resetSchedules,
	resetSelectedDay,
	resetSelectedMaster,
	resetSelectedMonth,
	resetSelectedSchedule,
	resetSelectedService,
	resetWizard,
	resetWizardDateChoiceStepState,
	resetWizardStep,
	setAcceptPageAccess,
	setCalendarComponentLoading,
	setDates,
	setFwdBtnDisabled,
	setFwdBtnVisible,
	setMasters,
	setMastersFilterComponentLoading,
	setMonths,
	setMonthsFilterComponentLoading,
	setPrevWeekBtnDisabled,
	setSchedules,
	setSelectedMaster,
	setSelectedMonth,
	setServices,
	setServicesListLoading,
	WizardActions,
} from '@state-management/wizard-feature/wizard.actions';
import { debounce, interval, map, mergeMap, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
	selectDates,
	selectMasters,
	selectSelectedDay,
	selectSelectedMaster,
	selectSelectedService,
	selectStep,
	WizardFeature,
} from '@state-management/wizard-feature/wizard.reducer';
import { WizardMaxStep } from '@components/ui/wizard/constants/WizardMaxStep';
import { ServicesService } from '@api/ServicesService';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { Router } from '@angular/router';
import { MastersService } from '@api/MastersService';
import { WizardStepperEnum } from '@components/ui/wizard/wizard.component';
import { CalendarService } from '@api/CalendarService';
import { CalenderDatesLoaderDto } from '@models/CalenderDatesLoaderDto';
import { MonthsLoaderDto } from '@models/MonthsLoaderDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { DatesHelper } from '@helpers/DatesHelper';
import { Schedule } from '@interfaces/Schedule';
import { MaxProcedureDuration } from '@constants/MaxProcedureDuration';
import { MasterDto } from '@models/MasterDto';
import { ScheduleLoaderDto } from '@models/ScheduleLoaderDto';
import { ConfirmForm } from '@interfaces/ConfirmForm';
import { OrderService } from '@api/OrderService';
import { TypedActionWithPayload } from '@state-management/TypedActionWithPayload';

@Injectable()
export class WizardEffects {
	constructor(
		private actions$: Actions,
		private store: Store,
		private servicesService: ServicesService,
		private router: Router,
		private mastersService: MastersService,
		private calendarService: CalendarService,
		private orderService: OrderService,
	) {}

	getServices$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetServicesAction),
			map((action: TypedActionWithPayload<string | null>) => action.payload),
			debounce((payload: string | null) => interval(payload ? 300 : 0)),
			switchMap((payload: string | null) =>
				this.servicesService
					.getServices(payload)
					.pipe(
						switchMap(response => [setServices({ payload: response }), setServicesListLoading({ payload: false })]),
					),
			),
		);
	});

	increaseWizardStep$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.IncrementWizardStepAction),
			concatLatestFrom(() => this.store.select(selectStep)),
			map(([, step]) => {
				if (step === WizardMaxStep) {
					return resetWizardStep();
				}
				return changeWizardStep({ payload: 1 });
			}),
		);
	});

	decreaseWizardStep$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.DecrementWizardStepAction),
			concatLatestFrom(() => this.store.select(WizardFeature.selectStep)),
			mergeMap(([, step]) => {
				if (step === WizardStepperEnum.SERVICE_CHOICE) {
					return [resetWizardStep()];
				}
				return [changeWizardStep({ payload: -1 })];
			}),
		);
	});

	changeWizardStep$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.ChangeWizardStepAction),
			concatLatestFrom(() => {
				return [this.store.select(WizardFeature.selectStep)];
			}),
			switchMap(([, step]) => {
				switch (step) {
					case WizardStepperEnum.SERVICE_CHOICE: {
						this.router.navigate([NAVIGATE_ROUTES.WIZARD]);
						return [initializeWizardServiceChoice(), resetWizardDateChoiceStepState()];
					}
					case WizardStepperEnum.DATE_CHOICE: {
						return [initializeWizardDateChoice()];
					}
					case WizardStepperEnum.CONFIRM_PAGE: {
						return [initializeWizardConfirmStep()];
					}
					default:
						return [resetWizardStep()];
				}
			}),
		);
	});

	checkIsWizardAvailable$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.ChangeWizardStepAction),
			map(() => checkIsWizardAvailable()),
		);
	});

	resetWizardStep$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.ResetWizardStepAction),
			mergeMap(() => {
				this.router.navigate([NAVIGATE_ROUTES.HOME]);
				return [resetSelectedService(), setFwdBtnDisabled({ payload: true })];
			}),
		);
	});

	setSelectedService$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.SetSelectedServiceAction),
			concatLatestFrom(() => this.store.select(WizardFeature.selectSelectedService)),
			map(([, service]) => {
				if (!!service) {
					return setFwdBtnDisabled({ payload: false });
				} else {
					return setFwdBtnDisabled({ payload: true });
				}
			}),
		);
	});

	getMasters$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetMastersAction),
			concatLatestFrom(() => this.store.select(WizardFeature.selectSelectedService)),
			map(([, service]) => {
				return {
					servicesIds: service?.id ?? undefined,
				};
			}),
			switchMap(params =>
				this.mastersService
					.getMasters(params)
					.pipe(
						switchMap(response => [
							setMasters({ payload: response.result }),
							setMastersFilterComponentLoading({ payload: false }),
						]),
					),
			),
		);
	});

	getDates$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetDatesAction),
			map((action: TypedActionWithPayload<CalenderDatesLoaderDto>) => action.payload),
			mergeMap(datesDto =>
				this.calendarService
					.getDates(datesDto)
					.pipe(
						switchMap(calendarDates => [
							setDates({ payload: calendarDates }),
							setCalendarComponentLoading({ payload: false }),
						]),
					),
			),
		);
	});

	getScheduleAfterSelectDay$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.SetSelectedDayAction),
			map((action: TypedActionWithPayload<string>) => action.payload),
			concatLatestFrom(() => this.store.select(WizardFeature.selectSelectedMaster)),
			map(([date, selectedMaster]) => {
				return getSchedules({ payload: { date, masterId: selectedMaster?.id } });
			}),
		);
	});

	getSchedules$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetSchedulesAction),
			map((action: TypedActionWithPayload<ScheduleLoaderDto>) => action.payload),
			concatLatestFrom(() => [
				this.store.select(WizardFeature.selectSelectedService),
				this.store.select(WizardFeature.selectMasters),
				this.store.select(WizardFeature.selectSelectedMaster),
			]),
			switchMap(([{ date, masterId }, service, masters, selectedMaster]) =>
				this.calendarService.getSchedule({ date, masterId }).pipe(
					map(schedulesDto =>
						schedulesDto.map(schedule => {
							return {
								...schedule,
								cost: service!.cost,
								duration: service!.duration,
								masterName: masters?.find(master => master.id === schedule.masterId)?.name,
								freeTimesWithShifts: DatesHelper.getFreeTimesWithShifts(
									schedule.freetimes,
									MaxProcedureDuration - service!.duration,
								),
							} as Schedule;
						}),
					),
					switchMap(schedules => {
						if (!schedules || schedules.length === 0) {
							return [
								resetSelectedDay(),
								resetSelectedSchedule(),
								resetSchedules(),
								setFwdBtnDisabled({ payload: true }),
								getDates({
									payload: {
										serviceId: service!.id,
										masterId: selectedMaster?.id ?? null,
									},
								}),
								setCalendarComponentLoading({ payload: true }),
							];
						}
						return [setSchedules({ payload: schedules })];
					}),
				),
			),
		);
	});

	getMonths$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetMonthsAction),
			map((action: TypedActionWithPayload<MonthsLoaderDto>) => action.payload),
			mergeMap(monthLoaderDto =>
				this.calendarService
					.getMonths(monthLoaderDto)
					.pipe(
						switchMap(monthsDto => [
							setMonths({ payload: monthsDto }),
							setMonthsFilterComponentLoading({ payload: false }),
						]),
					),
			),
		);
	});

	getNextWeek$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetNextWeekAction),
			concatLatestFrom(() => {
				return [
					this.store.select(selectSelectedMaster),
					this.store.select(selectSelectedService),
					this.store.select(selectDates),
				];
			}),
			switchMap(([, selectedMater, selectedService, calendarDates]) => {
				if (selectedService && calendarDates) {
					return this.calendarService
						.getDates({
							serviceId: selectedService.id,
							masterId: selectedMater?.id ?? null,
							week: DatesHelper.getNextWeekNumber(calendarDates[0].date),
						})
						.pipe(map(datesDto => setDates({ payload: datesDto })));
				}
				return this.calendarService
					.getDates({ serviceId: '1', masterId: '1' })
					.pipe(
						switchMap(datesDto => [setDates({ payload: datesDto }), setCalendarComponentLoading({ payload: false })]),
					);
			}),
		);
	});

	getPrevWeek$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetPrevWeekAction),
			concatLatestFrom(() => {
				return [
					this.store.select(WizardFeature.selectSelectedMaster),
					this.store.select(WizardFeature.selectSelectedService),
					this.store.select(WizardFeature.selectDates),
				];
			}),
			switchMap(([, selectedMater, selectedService, calendarDates]) => {
				if (selectedService && calendarDates) {
					return this.calendarService
						.getDates({
							serviceId: selectedService.id,
							masterId: selectedMater?.id ?? null,
							week: DatesHelper.getPrevWeekNumber(calendarDates[0].date),
						})
						.pipe(map(datesDto => setDates({ payload: datesDto })));
				}
				return this.calendarService
					.getDates({ serviceId: '1', masterId: '1' })
					.pipe(
						switchMap(datesDto => [setDates({ payload: datesDto }), setCalendarComponentLoading({ payload: false })]),
					);
			}),
		);
	});

	setMonths$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.SetDatesAction),
			map((action: TypedActionWithPayload<CalendarDatesDto[]>) => action.payload),
			switchMap(dates => {
				return [
					setSelectedMonth({ payload: DatesHelper.getStartOfMonth(dates[0].date) }),
					setPrevWeekBtnDisabled({ payload: DatesHelper.isPrevWeekInPast(dates[0].date) }),
				];
			}),
		);
	});

	setSelectedSchedule$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.SetSelectedScheduleAction),
			map((action: TypedActionWithPayload<Schedule>) => action.payload),
			concatLatestFrom(() => this.store.select(selectMasters)),
			map(([schedule, masters]) => masters?.find(master => master.id === schedule.masterId)),
			switchMap(master => [setFwdBtnDisabled({ payload: false }), setSelectedMaster({ payload: master! })]),
		);
	});

	resetSecondStepAfterSetMaster$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.SetSelectedMasterAction),
			map((action: TypedActionWithPayload<MasterDto>) => action.payload),
			concatLatestFrom(() => this.store.select(selectSelectedDay)),
			switchMap(([master, date]) => {
				return [getSchedules({ payload: { date, masterId: master?.id } })];
			}),
		);
	});

	resetWizardDateChoiceStepState$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.ResetWizardDateChoiceStepStateAction),
			switchMap(() => [
				resetSelectedMaster(),
				resetSelectedDay(),
				resetSelectedMonth(),
				resetSelectedSchedule(),
				resetSchedules(),
			]),
		);
	});

	loadWizard$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.LoadWizardAction),
			map(() => incrementWizardStep()),
		);
	});

	createOrder$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.SetOrderAction),
			map((action: TypedActionWithPayload<ConfirmForm>) => action.payload),
			switchMap(order =>
				this.orderService.createOrder(order).pipe(
					switchMap(() => {
						this.router.navigate([NAVIGATE_ROUTES.ACCEPT]);
						return [resetWizard(), setAcceptPageAccess({ payload: true })];
					}),
				),
			),
		);
	});

	initializeWizardServiceChoice$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.InitializeWizardServiceChoiceAction),
			concatLatestFrom(() => this.store.select(WizardFeature.selectSelectedService)),
			switchMap(([, service]) => {
				return [
					getServices({ payload: null }),
					...(!!service ? [setFwdBtnDisabled({ payload: false })] : []),
					setServicesListLoading({ payload: true }),
				];
			}),
		);
	});

	initializeWizardDateChoice$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.InitializeWizardDateChoiceAction),
			concatLatestFrom(() => {
				return [
					this.store.select(WizardFeature.selectSelectedService),
					this.store.select(WizardFeature.selectSelectedMaster),
					this.store.select(WizardFeature.selectSelectedSchedule),
				];
			}),
			switchMap(([, service, master, schedule]) => {
				return [
					getMasters({
						payload: { servicesIds: service?.id ?? undefined },
					}),
					getDates({
						payload: {
							masterId: master?.id ?? null,
							serviceId: service?.id ?? null,
						},
					}),
					getMonths({
						payload: {
							currentMonth: new Date().getMonth().toString(),
						},
					}),
					setFwdBtnDisabled({ payload: !schedule }),
					setFwdBtnVisible({ payload: true }),
					setMastersFilterComponentLoading({ payload: true }),
					setMonthsFilterComponentLoading({ payload: true }),
					setCalendarComponentLoading({ payload: true }),
				];
			}),
		);
	});

	initializeWizardConfirmStep$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.InitializeWizardConfirmStepAction),
			switchMap(() => [setFwdBtnDisabled({ payload: true }), setFwdBtnVisible({ payload: false })]),
		);
	});
}
