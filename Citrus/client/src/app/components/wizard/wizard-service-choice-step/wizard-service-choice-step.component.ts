import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	OnDestroy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { ClientInitValue } from '@constants/client-init-value';
import { ChoisenService, Client } from '@interfaces/client';
import { Service } from '@interfaces/service';
import { HttpService } from '@services/http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-wizard-service-choice-step',
	templateUrl: './wizard-service-choice-step.component.html',
	styleUrls: ['./wizard-service-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardServiceChoiceStepComponent implements OnInit, OnDestroy {
	@Input() client: Client = ClientInitValue;
	@Output() stepDone: EventEmitter<ChoisenService> = new EventEmitter();
	public servicesList: Service[] = [];
	public choisenService: number | null = null;
	private servicesListInit: Service[] = [];
	private subscription: Subscription = new Subscription();
	constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}
	ngOnInit(): void {
		this.subscription.add(
			this.http?.getServices()?.subscribe(data => {
				this.servicesListInit = data;
				this.servicesList = this.servicesListInit;
				if (this.client.serviceId !== null) {
					this.onStepDone(
						this.servicesListInit.find(
							service => service.id === this.client.serviceId,
						),
					);
				}
				this.cdr.markForCheck();
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	autocompleteSelected(value: Service | null): void {
		value
			? (this.servicesList = [value])
			: (this.servicesList = this.servicesListInit);
	}
	onStepDone(service: Service | undefined): void {
		if (service) {
			this.choisenService = service.id;
			this.stepDone.emit({
				serviceId: service.id,
				serviceName: service.title,
			});
		}
	}
}
