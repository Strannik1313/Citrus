import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from '@components/wizard/wizard.component';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { WizardFirstStepComponent } from '@components/wizard/wizard-first-step/wizard-first-step.component';
import { WizardSecondStepComponent } from '@components/wizard/wizard-second-step/wizard-second-step.component';
import { WizardThirdStepComponent } from '@components/wizard/wizard-third-step/wizard-third-step.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		WizardComponent,
		WizardFirstStepComponent,
		WizardSecondStepComponent,
		WizardThirdStepComponent,
	],
	imports: [
		CommonModule,
		PortalModule,
		MatButtonModule,
		MatCardModule,
		MatListModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		RouterModule.forChild([{ path: '', component: WizardComponent }]),
	],
})
export class WizardModule {}
