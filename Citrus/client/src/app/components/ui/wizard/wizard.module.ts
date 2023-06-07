import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from '@components/ui/wizard/wizard.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FirstLetterUppercasePipe } from '@pipes/first-letter-uppercase.pipe';
import { StepperModule } from '@shared/stepper/stepper.module';
import { CalendarModule } from '@shared/calendar/calendar.module';
import { ServiceListComponent } from '@components/ui/service-list/service-list.component';
import { WizardConfirmStepComponent } from '@components/ui/wizard/wizard-confirm-step/wizard-confirm-step.component';
import { WizardServiceChoiceStepComponent } from '@components/ui/wizard/wizard-service-choice-step/wizard-service-choice-step.component';
import { WizardDateChoiceStepComponent } from '@components/ui/wizard/wizard-date-choice-step/wizard-date-choice-step.component';
import { AutocompleteModule } from '@shared/autocomplete/autocomplete.module';
import { ScheduleModule } from '@shared/schedule/schedule.module';
import { MonthFilterModule } from '@shared/month-filter/month-filter.module';
import { DirectivesModule } from '@directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { WizardFeature } from '@components/ui/wizard/state-management/wizard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WizardEffects } from '@components/ui/wizard/state-management/wizard.effects';
import { FilterDropdownModule } from '@shared/filter-dropdown/filter-dropdown.module';

@NgModule({
	declarations: [
		WizardComponent,
		WizardServiceChoiceStepComponent,
		WizardDateChoiceStepComponent,
		WizardConfirmStepComponent,
		FirstLetterUppercasePipe,
		ServiceListComponent,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MatListModule,
		MatInputModule,
		MatFormFieldModule,
		StepperModule,
		CalendarModule,
		AutocompleteModule,
		ScheduleModule,
		MonthFilterModule,
		DirectivesModule,
		ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: WizardComponent }]),
		StoreModule.forFeature(WizardFeature.name, WizardFeature.reducer),
		EffectsModule.forFeature([WizardEffects]),
		FormsModule,
		FilterDropdownModule,
	],
})
export class WizardModule {}