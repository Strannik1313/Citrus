import { createFeature, createReducer, on } from '@ngrx/store';
import {
	changeWizardStep,
	resetSelectedService,
	resetWizardStep,
	setDates,
	setFwdBtnDisabled,
	setMasters,
	setSelectedService,
	setServices,
} from '@components/wizard/state-management/wizard.actions';
import { Service } from '@models/service';
import { Master } from '@models/master';
import { CalendarDates } from '@models/calendar-dates';

export const wizardFeatureKey = 'wizard';

export interface WizardReducer {
	step: number;
	fwdBtnDisabled: boolean;
	services: Service[];
	selectedService: Service | null;
	masters: Master[] | null;
	selectedMaster: Master | null;
	dates: CalendarDates[] | null;
}

export const wizardInitialState: WizardReducer = {
	step: 1,
	fwdBtnDisabled: true,
	services: [],
	selectedService: null,
	masters: null,
	selectedMaster: null,
	dates: null,
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
} = WizardFeature;
