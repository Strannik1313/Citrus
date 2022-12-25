import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
	changeWizardStep,
	getDates,
	getMasters,
	getServices,
	resetSelectedService,
	resetWizardStep,
	setDates,
	setFwdBtnDisabled,
	setMasters,
	setServices,
	WizardActions,
} from '@components/wizard/state-management/wizard.actions';
import { debounceTime, map, mergeMap, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { WizardFeature } from '@components/wizard/state-management/wizard.reducer';
import { WizardMaxStep } from '@components/wizard/constants/WizardMaxStep';
import { ServicesService } from '../../../api/ServicesService';
import { NAVIGATE_ROUTES } from '@constants/navigate-routes';
import { Router } from '@angular/router';
import { MastersService } from '../../../api/MastersService';
import { WizardStepperEnum } from '@components/wizard/wizard.component';
import { CalendarService } from '../../../api/CalendarService';

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
			map((action: any) => action.payload),
			debounceTime(300),
			switchMap((payload: string | null) =>
				this.servicesService
					.getServices(payload)
					.pipe(map(response => setServices({ payload: response }))),
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
			map(([, step]) => {
				if (step === 1) {
					return resetWizardStep();
				}
				return changeWizardStep({ payload: -1 });
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
					// case WizardStepperEnum.SERVICE_CHOICE: {
					// 	return getServices({ payload: null });
					// }
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

	setSelectedService$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.SetSelectedServiceAction),
			concatLatestFrom(() =>
				this.store.select(WizardFeature.selectSelectedService),
			),
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
			concatLatestFrom(() =>
				this.store.select(WizardFeature.selectSelectedService),
			),
			map(([, service]) => {
				return {
					serviceId: service?.id ?? null,
					masterId: null,
				};
			}),
			switchMap(masterResponse =>
				this.mastersService
					.getMasters(masterResponse)
					.pipe(map(masters => setMasters({ payload: masters }))),
			),
		);
	});

	getDates$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WizardActions.GetDatesAction),
			map((action: any) => action.payload),
			mergeMap(datesDto =>
				this.calendarService
					.getDates(datesDto)
					.pipe(map(calendarDates => setDates({ payload: calendarDates }))),
			),
		);
	});
}
