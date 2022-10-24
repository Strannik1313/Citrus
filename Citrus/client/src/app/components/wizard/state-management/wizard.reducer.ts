import { createFeatureSelector } from '@ngrx/store';
import { Service } from '@models/service';
import { WizardActions } from '@components/wizard/state-management/wizard.actions';

export interface WizardState {
	services: Service[];
}

export const initialWizardState: WizardState = {
	services: [],
};

export const wizardKey = 'interviewsPage';

export const wizardReducer = (
	// eslint-disable-next-line default-param-last
	state = initialWizardState,
	action: WizardActions,
): WizardState => {
	switch (action.type) {
		default:
			return state;
	}
};

export const featureSelector = createFeatureSelector<WizardState>(wizardKey);
// export const interviewsSelector = createSelector(featureSelector, (state) => state.interviews);
