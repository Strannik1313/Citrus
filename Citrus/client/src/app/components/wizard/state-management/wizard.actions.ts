import { createAction, props } from '@ngrx/store';
import { ServiceDto } from '@models/ServiceDto';
import { MasterDto, MasterLoaderDto } from '@models/MasterDto';
import { CalenderDatesLoaderDto } from '@models/CalenderDatesLoaderDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { TypedAction } from '@ngrx/store/src/models';
import { ScheduleLoaderDto } from '@models/ScheduleLoaderDto';
import { MonthsDto } from '@models/MonthsDto';
import { MonthsLoaderDto } from '@models/MonthsLoaderDto';
import { Schedule } from '@models/Schedule';

export interface TypedActionWithPayload<T> extends TypedAction<WizardActions> {
	payload: T;
}

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
	InitializeWizardServiceChoiceAction = '[Wizard Page] InitializeWizardServiceChoiceAction',
	InitializeWizardDateChoiceAction = '[Wizard Page] InitializeWizardDateChoiceAction',
	GetScheduleAction = '[Wizard Page] GetScheduleAction',
	SetSelectedDayAction = '[Wizard Page] SetSelectedDayAction',
	SetScheduleAction = '[Wizard Page] SetScheduleAction',
	SetSelectedTimeAction = '[Wizard Page] SetSelectedTimeAction',
	SetSelectedMasterAction = '[Wizard Page] SetSelectedMasterAction',
	GetMonthsAction = '[Wizard Page] GetMonthsAction',
	SetMonthsAction = '[Wizard Page] SetMonthsAction',
	SetSelectedMonthAction = '[Wizard Page] SetSelectedMonthAction',
	GetNextWeekAction = '[Wizard Page] GetNextWeekAction',
	GetPrevWeekAction = '[Wizard Page] GetPrevWeekAction',
	SetPrevWeekBtnDisabledAction = '[Wizard Page] SetPrevWeekBtnDisabledAction',
}

export const incrementWizardStep = createAction(WizardActions.IncrementWizardStepAction);

export const decrementWizardStep = createAction(WizardActions.DecrementWizardStepAction);

export const resetWizardStep = createAction(WizardActions.ResetWizardStepAction);

export const changeWizardStep = createAction(WizardActions.ChangeWizardStepAction, props<{ payload: number }>());

export const setServices = createAction(WizardActions.SetServicesAction, props<{ payload: ServiceDto[] }>());

export const getServices = createAction(WizardActions.GetServicesAction, props<{ payload: string | null }>());

export const setFwdBtnDisabled = createAction(WizardActions.SetFwdBtnDisabledAction, props<{ payload: boolean }>());

export const checkCurrentStep = createAction(WizardActions.CheckCurrentStepAction);

export const setSelectedService = createAction(
	WizardActions.SetSelectedServiceAction,
	props<{ payload: ServiceDto }>(),
);

export const resetSelectedService = createAction(WizardActions.ResetSelectedServiceAction);

export const getMasters = createAction(WizardActions.GetMastersAction, props<{ payload: MasterLoaderDto }>());

export const setMasters = createAction(WizardActions.SetMastersAction, props<{ payload: MasterDto[] }>());

export const getDates = createAction(WizardActions.GetDatesAction, props<{ payload: CalenderDatesLoaderDto }>());
export const initializeWizardServiceChoice = createAction(WizardActions.InitializeWizardServiceChoiceAction);
export const initializeWizardDateChoice = createAction(WizardActions.InitializeWizardDateChoiceAction);

export const setDates = createAction(WizardActions.SetDatesAction, props<{ payload: CalendarDatesDto[] }>());
export const getSchedule = createAction(WizardActions.GetScheduleAction, props<{ payload: ScheduleLoaderDto }>());
export const setSelectedDay = createAction(WizardActions.SetSelectedDayAction, props<{ payload: string }>());
export const setSchedules = createAction(WizardActions.SetScheduleAction, props<{ payload: Schedule[] }>());
export const setSelectedSchedule = createAction(WizardActions.SetSelectedTimeAction, props<{ payload: Schedule }>());
export const setSelectedMaster = createAction(
	WizardActions.SetSelectedMasterAction,
	props<{ payload: MasterDto | null }>(),
);
export const getMonths = createAction(WizardActions.GetMonthsAction, props<{ payload: MonthsLoaderDto | null }>());
export const setMonths = createAction(WizardActions.SetMonthsAction, props<{ payload: MonthsDto }>());
export const setSelectedMonth = createAction(WizardActions.SetSelectedMonthAction, props<{ payload: string | null }>());
export const getNextWeek = createAction(WizardActions.GetNextWeekAction);
export const getPrevWeek = createAction(WizardActions.GetPrevWeekAction);
export const setPrevWeekBtnDisabled = createAction(
	WizardActions.SetPrevWeekBtnDisabledAction,
	props<{ payload: boolean }>(),
);

export const login = createAction('[Login Page] Login', props<{ payload: { username: string; password: string } }>());
