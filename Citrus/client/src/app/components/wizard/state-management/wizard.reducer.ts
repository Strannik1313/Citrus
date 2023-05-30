import { createFeature, createReducer, on } from '@ngrx/store';
import {
	changeWizardStep,
	resetSelectedService,
	resetWizardStep,
	setSelectedSchedule,
	setDates,
	setFwdBtnDisabled,
	setMasters,
	setSchedules,
	setSelectedDay,
	setSelectedService,
	setServices,
	setSelectedMaster,
	setMonths,
	setSelectedMonth,
	setPrevWeekBtnDisabled,
} from '@components/wizard/state-management/wizard.actions';
import { ServiceDto } from '@models/ServiceDto';
import { MasterDto } from '@models/MasterDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { ScheduleDto } from '@models/ScheduleDto';

export const wizardFeatureKey = 'wizard';

export interface WizardReducer {
	step: number;
	fwdBtnDisabled: boolean;
	services: ServiceDto[];
	selectedService: ServiceDto | null;
	masters: MasterDto[] | null;
	selectedMaster: MasterDto | null;
	dates: CalendarDatesDto[] | null;
	selectedDay: string | null;
	schedules: ScheduleDto[] | null;
	selectedSchedule: ScheduleDto | null;
	months: string[] | null;
	selectedMonth: string | null;
	prevWeekBtnDisabled: boolean;
}

export const wizardInitialState: WizardReducer = {
	step: 1,
	fwdBtnDisabled: true,
	services: [],
	selectedService: null,
	masters: null,
	selectedMaster: null,
	dates: null,
	selectedDay: null,
	schedules: null,
	selectedSchedule: null,
	months: null,
	selectedMonth: null,
	prevWeekBtnDisabled: false,
};

export const WizardFeature = createFeature({
	name: wizardFeatureKey,
	reducer: createReducer(
		wizardInitialState,
		on(changeWizardStep, (state, { payload }): WizardReducer => {
			return {
				...state,
				step: state.step + payload,
			};
		}),
		on(resetWizardStep, (state): WizardReducer => {
			return {
				...state,
				step: 1,
			};
		}),
		on(setServices, (state, { payload }): WizardReducer => {
			return {
				...state,
				services: payload,
			};
		}),
		on(setFwdBtnDisabled, (state, { payload }): WizardReducer => {
			return {
				...state,
				fwdBtnDisabled: payload,
			};
		}),
		on(setSelectedService, (state, { payload }): WizardReducer => {
			return {
				...state,
				selectedService: payload,
			};
		}),
		on(resetSelectedService, (state): WizardReducer => {
			return {
				...state,
				selectedService: null,
			};
		}),
		on(setMasters, (state, { payload }): WizardReducer => {
			return {
				...state,
				masters: payload,
			};
		}),
		on(setDates, (state, { payload }): WizardReducer => {
			return {
				...state,
				dates: payload,
			};
		}),
		on(setSelectedDay, (state, { payload }): WizardReducer => {
			return {
				...state,
				selectedDay: payload,
			};
		}),
		on(setSchedules, (state, { payload }): WizardReducer => {
			return {
				...state,
				schedules: payload,
			};
		}),
		on(setSelectedSchedule, (state, { payload }): WizardReducer => {
			return {
				...state,
				selectedSchedule: payload,
			};
		}),
		on(setSelectedMaster, (state, { payload }): WizardReducer => {
			return {
				...state,
				selectedMaster: payload,
			};
		}),
		on(setMonths, (state, { payload }): WizardReducer => {
			return {
				...state,
				months: payload.months,
			};
		}),
		on(setSelectedMonth, (state, { payload }): WizardReducer => {
			return {
				...state,
				selectedMonth: payload,
			};
		}),
		on(setPrevWeekBtnDisabled, (state, { payload }): WizardReducer => {
			return {
				...state,
				prevWeekBtnDisabled: payload,
			};
		}),
	),
});

export const {
	name,
	reducer,
	selectWizardState,
	selectStep,
	selectFwdBtnDisabled,
	selectServices,
	selectSelectedService,
	selectMasters,
	selectSelectedMaster,
	selectDates,
	selectSelectedDay,
	selectSchedules,
	selectSelectedSchedule,
	selectMonths,
	selectSelectedMonth,
	selectPrevWeekBtnDisabled,
} = WizardFeature;
