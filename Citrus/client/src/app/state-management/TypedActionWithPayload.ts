import { TypedAction } from '@ngrx/store/src/models';
import { WizardActions } from '@state-management/wizard-feature/wizard.actions';

export interface TypedActionWithPayload<T> extends TypedAction<WizardActions> {
	payload: T;
}
