import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from '@components/wizard/wizard.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [WizardComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: WizardComponent }]),
	],
})
export class WizardModule {}
