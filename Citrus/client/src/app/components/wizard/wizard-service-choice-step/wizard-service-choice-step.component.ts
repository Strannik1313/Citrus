import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { ChoisenService, Client } from '@models/client';
import { Service } from '@models/service';

@Component({
	selector: 'app-wizard-service-choice-step',
	templateUrl: './wizard-service-choice-step.component.html',
	styleUrls: ['./wizard-service-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardServiceChoiceStepComponent implements OnChanges {
	@Input() client: Client | null = CLIENT_INIT_VALUE;
	@Input() services: Array<Service> | null = [];
	@Output() serviceChange: EventEmitter<ChoisenService> = new EventEmitter();
	public completeServicesList: Service[] = [];
	public servicesList: Service[] | null = [];
	public choisenService: number | null = null;
	ngOnChanges(changes: SimpleChanges): void {
		for (let propName in changes) {
			let chng = changes[propName].currentValue;
			switch (propName) {
				case 'client':
					this.choisenService = chng.serviceId;
					if (chng.serviceId !== null) {
						this.serviceChange.emit({
							serviceId: chng.serviceId,
							serviceName: chng.serviceName,
						});
					}
					break;
				case 'services':
					this.servicesList = changes.services?.currentValue;
					break;

				default:
					break;
			}
		}
	}
	autocompleteSelected(value: Service | null): void {
		value
			? (this.servicesList = [value])
			: (this.servicesList = this.completeServicesList);
	}
	onServiceChange(service: Service | undefined): void {
		if (service) {
			this.choisenService = service.id;
			this.serviceChange.emit({
				serviceId: service.id,
				serviceName: service.title,
			});
		}
	}
}
