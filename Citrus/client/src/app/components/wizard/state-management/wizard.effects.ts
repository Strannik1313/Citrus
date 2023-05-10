import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
	changeWizardStep,
	getDates,
	getMasters,
	getMonths,
	getNextWeek,
	getServices,
	initializeWizardServiceChoice,
	resetSelectedService,
	resetWizardStep,
	setDates,
	setFwdBtnDisabled,
	setMasters,
	setMonths,
	setSchedules,
	setServices,
	TypedActionWithPayload,
	WizardActions,
} from '@components/wizard/state-management/wizard.actions';
import { debounce, interval, map, mergeMap, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { WizardFeature } from '@components/wizard/state-management/wizard.reducer';
import { WizardMaxStep } from '@components/wizard/constants/WizardMaxStep';
import { ServicesService } from '@api/ServicesService';
import { NAVIGATE_ROUTES } from '@constants/navigate-routes';
import { Router } from '@angular/router';
import { MastersService } from '@api/MastersService';
import { WizardStepperEnum } from '@components/wizard/wizard.component';
import { CalendarService } from '@api/CalendarService';
import { CalenderDatesLoaderDto } from '@models/CalenderDatesLoaderDto';
import { MonthsLoaderDto } from '@models/MonthsLoaderDto';
import { DatesHelper } from '../../../helpers/DatesHelper';

@Injectable()
export class WizardEffects {
	constructor(
		private actions$: Actions,
		private store: Store,
		private servicesService: ServicesService,
		private router: Router,
		private mastersService: MastersService,
		private calendarService: CalendarService,
	) {}

	getServices$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetServicesAction),
			map((action: TypedActionWithPayload<string | null>) => action.payload),
			debounce((payload: string | null) => interval(payload ? 300 : 0)),
			switchMap((payload: string | null) =>
				this.servicesService.getServices(payload).pipe(map(response => setServices({ payload: response }))),
			),
		);
	});

	increaseWizardStep$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.IncrementWizardStepAction),
			concatLatestFrom(() => this.store.select(WizardFeature.selectStep)),
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
				return [
					this.store.select(WizardFeature.selectStep),
					this.store.select(WizardFeature.selectSelectedService),
					this.store.select(WizardFeature.selectSelectedMaster),
				];
			}),
			switchMap(([, step, service, master]) => {
				switch (step) {
					case WizardStepperEnum.SERVICE_CHOICE: {
						return [initializeWizardServiceChoice()];
					}
					case WizardStepperEnum.DATE_CHOICE: {
						return [
							getMasters({
								payload: { serviceId: service?.id ?? null, masterId: null },
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
							setFwdBtnDisabled({ payload: true }),
						];
					}
					default:
						return [getServices({ payload: null })];
				}
			}),
		);
	});

	resetWizardStep$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.ResetWizardStepAction),
			mergeMap(() => {
				this.router.navigate([NAVIGATE_ROUTES.home]);
				return [resetSelectedService(), setFwdBtnDisabled({ payload: true })];
			}),
		);
	});

	initializeWizardServiceChoice$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.InitializeWizardServiceChoiceAction),
			concatLatestFrom(() => this.store.select(WizardFeature.selectSelectedService)),
			switchMap(([, service]) => {
				return [getServices({ payload: null }), ...(!!service ? [setFwdBtnDisabled({ payload: false })] : [])];
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
					serviceId: service?.id ?? null,
					masterId: null,
				};
			}),
			switchMap(masterResponse =>
				this.mastersService.getMasters(masterResponse).pipe(map(masters => setMasters({ payload: masters }))),
			),
		);
	});

	getDates$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetDatesAction),
			map((action: TypedActionWithPayload<CalenderDatesLoaderDto>) => action.payload),
			mergeMap(datesDto =>
				this.calendarService.getDates(datesDto).pipe(map(calendarDates => setDates({ payload: calendarDates }))),
			),
		);
	});

	setSchedule$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.SetSelectedDayAction),
			map((action: TypedActionWithPayload<string>) => action.payload),
			concatLatestFrom(() => this.store.select(WizardFeature.selectSelectedService)),
			mergeMap(([day, service]) => {
				return this.calendarService
					.getSchedule({ date: day, serviceId: service!.id })
					.pipe(map(schedules => setSchedules({ payload: schedules })));
			}),
		);
	});

	getMonths$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetMonthsAction),
			map((action: TypedActionWithPayload<MonthsLoaderDto>) => action.payload),
			mergeMap(monthLoaderDto =>
				this.calendarService.getMonths(monthLoaderDto).pipe(map(monthsDto => setMonths({ payload: monthsDto }))),
			),
		);
	});

	getNextWeek$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetNextWeekAction),
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
							week: DatesHelper.getNextWeekNumber(calendarDates[0].date),
						})
						.pipe(map(datesDto => setDates({ payload: datesDto })));
				}
				return this.calendarService
					.getDates({ serviceId: 1, masterId: 1 })
					.pipe(map(datesDto => setDates({ payload: datesDto })));
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
					.getDates({ serviceId: 1, masterId: 1 })
					.pipe(map(datesDto => setDates({ payload: datesDto })));
			}),
		);
	});
}
