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
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { ChoisenService, Client } from '@models/client';
import { Service } from '@models/service';
import { HttpService } from '@services/http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-wizard-service-choice-step',
	templateUrl: './wizard-service-choice-step.component.html',
	styleUrls: ['./wizard-service-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardServiceChoiceStepComponent implements OnInit, OnDestroy {
	@Input() client: Client = CLIENT_INIT_VALUE;
	@Output() stepDone: EventEmitter<ChoisenService> = new EventEmitter();
	private subscription: Subscription = new Subscription();
	public completeServicesList: Service[] = [];
	public servicesList: Service[] = [];
	public choisenService: number | null = null;
	constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}
	ngOnInit(): void {
		this.subscription.add(
			this.http.getServices().subscribe(data => {
				this.completeServicesList = data;
				this.servicesList = this.completeServicesList;
				if (this.client.serviceId !== null) {
					this.onStepDone(
						this.completeServicesList.find(
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
			: (this.servicesList = this.completeServicesList);
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
