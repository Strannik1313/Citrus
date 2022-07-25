import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '@services/storage.service';

@Component({
	selector: 'app-wizard-second-step',
	templateUrl: './wizard-second-step.component.html',
	styleUrls: ['./wizard-second-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardSecondStepComponent {
	constructor(private storage: StorageService) {
		this.storage.setIsWizardStepDone(false);
	}
	stepDone(): void {
		this.storage.setIsWizardStepDone(true);
	}
}
