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
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { FirstLetterUppercasePipe } from '@pipes/first-letter-uppercase.pipe';

@NgModule({
	declarations: [
		WizardComponent,
		WizardFirstStepComponent,
		WizardSecondStepComponent,
		WizardThirdStepComponent,
		FirstLetterUppercasePipe,
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MatListModule,
		MatInputModule,
		MatFormFieldModule,
		OverlayModule,
		FormsModule,
		RouterModule.forChild([{ path: '', component: WizardComponent }]),
	],
})
export class WizardModule {}
