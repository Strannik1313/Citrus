import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '@services/storage.service';

@Component({
	selector: 'app-wizard-confirm-step',
	templateUrl: './wizard-confirm-step.component.html',
	styleUrls: ['./wizard-confirm-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardConfirmStepComponent {
	constructor(private storage: StorageService) {}
}
