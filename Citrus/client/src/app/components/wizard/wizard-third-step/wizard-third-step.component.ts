import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from '@services/storage.service';

@Component({
	selector: 'app-wizard-third-step',
	templateUrl: './wizard-third-step.component.html',
	styleUrls: ['./wizard-third-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardThirdStepComponent {
	constructor(private storage: StorageService) {}
}
