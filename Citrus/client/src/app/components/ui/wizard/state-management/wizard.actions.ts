import { createAction, props } from '@ngrx/store';
import { ServiceDto } from '@models/ServiceDto';
import { MasterDto } from '@models/MasterDto';
import { CalenderDatesLoaderDto } from '@models/CalenderDatesLoaderDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { TypedAction } from '@ngrx/store/src/models';
import { ScheduleLoaderDto } from '@models/ScheduleLoaderDto';
import { MonthsDto } from '@models/MonthsDto';
import { MonthsLoaderDto } from '@models/MonthsLoaderDto';
import { Schedule } from '@models/Schedule';
import { MasterLoaderDto } from '@models/MasterLoaderDto';
import { ConfirmForm } from '@models/ConfirmForm';

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
	InitializeWizardConfirmStepAction = '[Wizard Page] InitializeWizardConfirmStepAction',
	GetSchedulesAction = '[Wizard Page] GetSchedulesAction',
	SetSelectedDayAction = '[Wizard Page] SetSelectedDayAction',
	SetScheduleAction = '[Wizard Page] SetScheduleAction',
	SetSelectedScheduleAction = '[Wizard Page] SetSelectedScheduleAction',
	SetSelectedMasterAction = '[Wizard Page] SetSelectedMasterAction',
	GetMonthsAction = '[Wizard Page] GetMonthsAction',
	SetMonthsAction = '[Wizard Page] SetMonthsAction',
	SetSelectedMonthAction = '[Wizard Page] SetSelectedMonthAction',
	GetNextWeekAction = '[Wizard Page] GetNextWeekAction',
	GetPrevWeekAction = '[Wizard Page] GetPrevWeekAction',
	SetPrevWeekBtnDisabledAction = '[Wizard Page] SetPrevWeekBtnDisabledAction',
	ResetWizardDateChoiceStepStateAction = '[Wizard Page] ResetWizardDateChoiceStepStateAction',
	ResetSelectedMasterAction = '[Wizard Page] ResetSelectedMasterAction',
	ResetSelectedDayAction = '[Wizard Page] ResetSelectedDayAction',
	ResetSelectedMonthAction = '[Wizard Page] ResetSelectedMonthAction',
	ResetSelectedScheduleAction = '[Wizard Page] ResetSelectedScheduleAction',
	ResetSchedulesAction = '[Wizard Page] ResetSchedulesAction',
	SetServicesListComponentLoadingAction = '[Wizard Page] SetServicesListComponentLoadingAction',
	SetMastersFilterComponentLoadingAction = '[Wizard Page] SetMastersFilterComponentLoadingAction',
	SetMonthsFilterComponentLoadingAction = '[Wizard Page] SetMonthsFilterComponentLoadingAction',
	SetCalendarComponentLoadingAction = '[Wizard Page] SetCalendarComponentLoadingAction',
	SetSchedulesComponentLoadingAction = '[Wizard Page] SetSchedulesComponentLoadingAction',
	LoadWizardAction = '[Wizard Page] LoadWizardAction',
	SetOrderAction = '[Wizard Page] SetOrderAction',
	ResetWizardAction = '[Wizard Page] ResetWizardAction',
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
export const initializeWizardConfirmStep = createAction(WizardActions.InitializeWizardConfirmStepAction);

export const setDates = createAction(WizardActions.SetDatesAction, props<{ payload: CalendarDatesDto[] }>());
export const getSchedules = createAction(WizardActions.GetSchedulesAction, props<{ payload: ScheduleLoaderDto }>());
export const setSelectedDay = createAction(WizardActions.SetSelectedDayAction, props<{ payload: string }>());
export const setSchedules = createAction(WizardActions.SetScheduleAction, props<{ payload: Schedule[] }>());
export const setSelectedSchedule = createAction(
	WizardActions.SetSelectedScheduleAction,
	props<{ payload: Schedule }>(),
);
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
export const resetWizardDateChoiceStepState = createAction(WizardActions.ResetWizardDateChoiceStepStateAction);
export const resetSelectedMaster = createAction(WizardActions.ResetSelectedMasterAction);
export const resetSelectedDay = createAction(WizardActions.ResetSelectedDayAction);
export const resetSelectedMonth = createAction(WizardActions.ResetSelectedMonthAction);
export const resetSelectedSchedule = createAction(WizardActions.ResetSelectedScheduleAction);
export const resetSchedules = createAction(WizardActions.ResetSchedulesAction);
export const setServicesListLoading = createAction(
	WizardActions.SetServicesListComponentLoadingAction,
	props<{
		payload: boolean;
	}>(),
);
export const setMastersFilterComponentLoading = createAction(
	WizardActions.SetMastersFilterComponentLoadingAction,
	props<{
		payload: boolean;
	}>(),
);
export const setMonthsFilterComponentLoading = createAction(
	WizardActions.SetMonthsFilterComponentLoadingAction,
	props<{
		payload: boolean;
	}>(),
);
export const setCalendarComponentLoading = createAction(
	WizardActions.SetCalendarComponentLoadingAction,
	props<{
		payload: boolean;
	}>(),
);
export const setSchedulesComponentLoading = createAction(
	WizardActions.SetSchedulesComponentLoadingAction,
	props<{
		payload: boolean;
	}>(),
);
export const setOrder = createAction(
	WizardActions.SetOrderAction,
	props<{
		payload: ConfirmForm;
	}>(),
);
export const resetWizard = createAction(WizardActions.ResetWizardAction);
export const loadWizard = createAction(WizardActions.LoadWizardAction);

export const login = createAction('[Login Page] Login', props<{ payload: { username: string; password: string } }>());
