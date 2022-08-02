import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from '@components/wizard/wizard.component';
import { RouterModule } from '@angular/router';
import { WizardFirstStepComponent } from '@components/wizard/wizard-first-step/wizard-first-step.component';
import { WizardSecondStepComponent } from '@components/wizard/wizard-second-step/wizard-second-step.component';
import { WizardThirdStepComponent } from '@components/wizard/wizard-third-step/wizard-third-step.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FirstLetterUppercasePipe } from '@pipes/first-letter-uppercase.pipe';
import { StepperModule } from '@modules/stepper/stepper.module';
import { FilterModule } from '@shared/filter/filter.module';
import { CalendarModule } from '@shared/calendar/calendar.module';
import { SearchStringModule } from '@shared/search-string/search-string.module';
import { ServiceListComponent } from '@components/ui/service-list/service-list.component';

@NgModule({
	declarations: [
		WizardComponent,
		WizardFirstStepComponent,
		WizardSecondStepComponent,
		WizardThirdStepComponent,
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
		FilterModule,
		SearchStringModule,
		RouterModule.forChild([{ path: '', component: WizardComponent }]),
	],
})
export class WizardModule {}
