import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceDto } from '@models/ServiceDto';
import { WizardFirstStepLoadingState } from '@interfaces/ComponentsLoadingState';

@Component({
	selector: 'app-wizard-service-choice-step',
	templateUrl: './wizard-service-choice-step.component.html',
	styleUrls: ['./wizard-service-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardServiceChoiceStepComponent {
	@Input() services: Array<ServiceDto> | null = [];
	@Input() selectedService: ServiceDto | null = null;
	@Input() loadingState: WizardFirstStepLoadingState | null | undefined = null;
	@Output() serviceChange: EventEmitter<ServiceDto> = new EventEmitter();
	@Output() inputChange: EventEmitter<string | null> = new EventEmitter();
	onServiceChange(service: ServiceDto | undefined): void {
		if (service) {
			this.serviceChange.emit(service);
		}
	}

	onInputChange(event: Event) {
		this.inputChange.emit((<HTMLInputElement>event.target)?.value);
	}
}
