import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { Client } from '@models/client';
import { Service } from '@models/service';

@Component({
	selector: 'app-wizard-service-choice-step',
	templateUrl: './wizard-service-choice-step.component.html',
	styleUrls: ['./wizard-service-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardServiceChoiceStepComponent {
	@Input() client: Client | null = CLIENT_INIT_VALUE;
	@Input() services: Array<Service> | null = [];
	@Input() selectedService: Service | null = null;
	@Output() serviceChange: EventEmitter<Service> = new EventEmitter();
	@Output() inputChange: EventEmitter<string | null> = new EventEmitter();
	onServiceChange(service: Service | undefined): void {
		if (service) {
			this.serviceChange.emit(service);
		}
	}

	onInputChange(event: Event) {
		this.inputChange.emit((<HTMLInputElement>event.target)?.value);
	}
}
