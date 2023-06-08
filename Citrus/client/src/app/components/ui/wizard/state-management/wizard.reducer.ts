import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import {
	changeWizardStep,
	resetSchedules,
	resetSelectedDay,
	resetSelectedMaster,
	resetSelectedMonth,
	resetSelectedSchedule,
	resetSelectedService,
	resetWizardStep,
	setCalendarComponentLoading,
	setDates,
	setFwdBtnDisabled,
	setMasters,
	setMastersFilterComponentLoading,
	setMonths,
	setMonthsFilterComponentLoading,
	setPrevWeekBtnDisabled,
	setSchedules,
	setSchedulesComponentLoading,
	setSelectedDay,
	setSelectedMaster,
	setSelectedMonth,
	setSelectedSchedule,
	setSelectedService,
	setServices,
	setServicesListLoading,
} from '@components/ui/wizard/state-management/wizard.actions';
import { ServiceDto } from '@models/ServiceDto';
import { MasterDto } from '@models/MasterDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { Schedule } from '@models/Schedule';
import equal from 'fast-deep-equal/es6';
import { ComponentsLoadingState } from '@models/ComponentsLoadingState';

export const wizardFeatureKey = 'wizard';

export interface WizardReducer {
	isWizardAvailable: boolean;
	step: number;
	fwdBtnDisabled: boolean;
	services: ServiceDto[];
	selectedService: ServiceDto | null;
	masters: MasterDto[] | null;
	selectedMaster: MasterDto | null;
	dates: CalendarDatesDto[] | null;
	selectedDay: string | null;
	schedules: Schedule[] | null;
	selectedSchedule: Schedule | null;
	months: string[] | null;
	selectedMonth: string | null;
	prevWeekBtnDisabled: boolean;
	isServicesListLoading: boolean;
	isMastersFilterLoading: boolean;
	isMonthsFilterLoading: boolean;
	isCalendarLoading: boolean;
	isSchedulesLoading: boolean;
}

export const wizardInitialState: WizardReducer = {
	isWizardAvailable: false,
	step: 0,
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
	isServicesListLoading: false,
	isMastersFilterLoading: false,
	isMonthsFilterLoading: false,
	isCalendarLoading: false,
	isSchedulesLoading: false,
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
		on(changeWizardStep, (state): WizardReducer => {
			return equal(state.isWizardAvailable, state.step > 0)
				? state
				: {
						...state,
						isWizardAvailable: state.step > 0,
				  };
		}),
		on(resetWizardStep, (state): WizardReducer => {
			return {
				...state,
				step: 0,
			};
		}),
		on(setServices, (state, { payload }): WizardReducer => {
			return equal(state, payload)
				? state
				: {
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
			return equal(state.selectedService, payload)
				? state
				: {
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
			return equal(state.masters, payload)
				? state
				: {
						...state,
						masters: payload,
				  };
		}),
		on(setDates, (state, { payload }): WizardReducer => {
			return equal(state.dates, payload)
				? state
				: {
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
			return equal(state.schedules, payload)
				? state
				: {
						...state,
						schedules: payload,
				  };
		}),
		on(setSelectedSchedule, (state, { payload }): WizardReducer => {
			return equal(state.selectedSchedule, payload)
				? state
				: {
						...state,
						selectedSchedule: payload,
				  };
		}),
		on(setSelectedMaster, (state, { payload }): WizardReducer => {
			return equal(state.selectedMaster, payload)
				? state
				: {
						...state,
						selectedMaster: payload,
				  };
		}),
		on(setMonths, (state, { payload }): WizardReducer => {
			return equal(state.months, payload)
				? state
				: {
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
		on(resetSelectedMaster, (state): WizardReducer => {
			return {
				...state,
				selectedMaster: null,
			};
		}),
		on(resetSelectedDay, (state): WizardReducer => {
			return {
				...state,
				selectedDay: null,
			};
		}),
		on(resetSelectedMonth, (state): WizardReducer => {
			return {
				...state,
				selectedMonth: null,
			};
		}),
		on(resetSelectedSchedule, (state): WizardReducer => {
			return {
				...state,
				selectedSchedule: null,
			};
		}),
		on(resetSchedules, (state): WizardReducer => {
			return {
				...state,
				schedules: null,
			};
		}),
		on(setServicesListLoading, (state, { payload }): WizardReducer => {
			return equal(state.isServicesListLoading, payload)
				? state
				: {
						...state,
						isServicesListLoading: payload,
				  };
		}),
		on(setMastersFilterComponentLoading, (state, { payload }): WizardReducer => {
			return equal(state.isMastersFilterLoading, payload)
				? state
				: {
						...state,
						isMastersFilterLoading: payload,
				  };
		}),
		on(setMonthsFilterComponentLoading, (state, { payload }): WizardReducer => {
			return equal(state.isMonthsFilterLoading, payload)
				? state
				: {
						...state,
						isMonthsFilterLoading: payload,
				  };
		}),
		on(setCalendarComponentLoading, (state, { payload }): WizardReducer => {
			return equal(state.isCalendarLoading, payload)
				? state
				: {
						...state,
						isCalendarLoading: payload,
				  };
		}),
		on(setSchedulesComponentLoading, (state, { payload }): WizardReducer => {
			return equal(state.isSchedulesLoading, payload)
				? state
				: {
						...state,
						isSchedulesLoading: payload,
				  };
		}),
	),
});

export const {
	name,
	reducer,
	selectWizardState,
	selectIsWizardAvailable,
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

export const selectScheduleSelectedTime = createSelector(
	WizardFeature.selectSelectedSchedule,
	schedule => schedule?.preOrder ?? null,
);
export const selectComponentsIsLoadingState = createSelector(
	WizardFeature.selectIsServicesListLoading,
	WizardFeature.selectIsMastersFilterLoading,
	WizardFeature.selectIsMonthsFilterLoading,
	WizardFeature.selectIsCalendarLoading,
	WizardFeature.selectIsSchedulesLoading,
	(
		isLoadingServiceList,
		isLoadingMasterFilter,
		isLoadingMonthsFilter,
		isLoadingCalendar,
		isLoadingSchedules,
	): ComponentsLoadingState => {
		return {
			wizardFirstStep: {
				isLoadingServiceList,
			},
			wizardSecondStep: {
				isLoadingMasterFilter,
				isLoadingMonthsFilter,
				isLoadingCalendar,
				isLoadingSchedules,
			},
		};
	},
);
