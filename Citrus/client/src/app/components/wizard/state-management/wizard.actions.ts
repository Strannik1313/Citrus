import { createAction, props } from '@ngrx/store';
import { Service } from '@models/service';
import { Master, MastersResponse } from '@models/master';
import { DatesDto } from '@models/DatesDto';
import { CalendarDates } from '@models/calendar-dates';

export enum WizardActions {
	IncrementWizardStepAction = '[Wizard Page] IncrementWizardStepAction',
	DecrementWizardStepAction = '[Wizard Page] DecrementWizardStepAction',
	ResetWizardStepAction = '[Wizard Page] ResetWizardStepAction',
	ChangeWizardStepAction = '[Wizard Page] ChangeWizardStepAction',
	GetServicesAction = '[Wizard Page] GetServicesAction',
	SetServicesAction = '[Wizard Page] SetServicesAction',
	SetFwdBtnDisabledAction = '[Wizard Page] SetFwdBtnDisabledAction',
	CheckCurrentStepAction = '[Wizard Page] CheckCurrentStepAction',
	SetSelectedServiceAction = '[Wizard Page] SetSelectedServiceAction',
	ResetSelectedServiceAction = '[Wizard Page] ResetSelectedServiceAction',
	GetMastersAction = '[Wizard Page] GetMastersAction',
	SetMastersAction = '[Wizard Page] SetMastersAction',
	GetDatesAction = '[Wizard Page] GetDatesAction',
	SetDatesAction = '[Wizard Page] SetDatesAction',
}
export const incrementWizardStep = createAction(
	WizardActions.IncrementWizardStepAction,
);

export const decrementWizardStep = createAction(
	WizardActions.DecrementWizardStepAction,
);

export const resetWizardStep = createAction(
	WizardActions.ResetWizardStepAction,
);

export const changeWizardStep = createAction(
	WizardActions.ChangeWizardStepAction,
	props<{ payload: number }>(),
);

export const setServices = createAction(
	WizardActions.SetServicesAction,
	props<{ payload: Service[] }>(),
);

export const getServices = createAction(
	WizardActions.GetServicesAction,
	props<{ payload: string | null }>(),
);

export const setFwdBtnDisabled = createAction(
	WizardActions.SetFwdBtnDisabledAction,
	props<{ payload: boolean }>(),
);

export const checkCurrentStep = createAction(
	WizardActions.CheckCurrentStepAction,
);

export const setSelectedService = createAction(
	WizardActions.SetSelectedServiceAction,
	props<{ payload: Service }>(),
);

export const resetSelectedService = createAction(
	WizardActions.ResetSelectedServiceAction,
);

export const getMasters = createAction(
	WizardActions.GetMastersAction,
	props<{ payload: MastersResponse }>(),
);

export const setMasters = createAction(
	WizardActions.SetMastersAction,
	props<{ payload: Master[] }>(),
);

export const getDates = createAction(
	WizardActions.GetDatesAction,
	props<{ payload: DatesDto }>(),
);

export const setDates = createAction(
	WizardActions.SetDatesAction,
	props<{ payload: CalendarDates[] }>(),
);

export const login = createAction(
	'[Login Page] Login',
	props<{ payload: { username: string; password: string } }>(),
);
