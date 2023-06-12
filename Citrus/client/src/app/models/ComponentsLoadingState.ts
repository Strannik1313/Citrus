export interface ComponentsLoadingState {
	wizardFirstStep: WizardFirstStepLoadingState;
	wizardSecondStep: WizardSecondStepLoadingState;
}

export interface WizardFirstStepLoadingState {
	isLoadingServiceList: boolean;
}

export interface WizardSecondStepLoadingState {
	isLoadingMasterFilter: boolean;
	isLoadingMonthsFilter: boolean;
	isLoadingCalendar: boolean;
	isLoadingSchedules: boolean;
}
