import { NgModule } from '@angular/core';
import * as reducer from './wizard.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WizardEffects } from '@components/wizard/state-management/wizard.effects';

@NgModule({
	imports: [
		StoreModule.forFeature(reducer.wizardKey, reducer.wizardReducer),
		EffectsModule.forFeature([WizardEffects]),
	],
})
export class InterviewsPageStateModule {}
