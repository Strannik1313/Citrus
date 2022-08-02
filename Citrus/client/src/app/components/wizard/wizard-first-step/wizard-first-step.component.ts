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
import { ClientDataFirstStepInit } from '@models/client-data';
import { Service } from '@models/service';
import { HttpService } from '@services/http.service';
import { SearchService } from '@services/search.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-wizard-first-step',
	templateUrl: './wizard-first-step.component.html',
	styleUrls: ['./wizard-first-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardFirstStepComponent implements OnInit, OnDestroy {
	@Input() shouldClientDataBeSaved: boolean = false;
	@Input() choisenService: number = -1;
	@Output() stepDone: EventEmitter<ClientDataFirstStepInit> =
		new EventEmitter();
	public services: Service[] = [];
	private subscription: Subscription = new Subscription();
	constructor(
		private search: SearchService<Service>,
		private http: HttpService,
		private cdr: ChangeDetectorRef,
	) {}
	ngOnInit(): void {
		this.subscription?.add(
			this.http?.getServices()?.subscribe(data => {
				this.services = [...data];
				this.search?.setData(this.services);
				if (this.choisenService !== -1) {
					this.onStepDone(
						this.services.find(service => service.id === this.choisenService),
					);
				}
				this.cdr?.markForCheck();
			}),
		);
	}
	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
	searchChange(value: string): void {
		this.subscription?.add(
			this.search?.setFilter(value.toLocaleLowerCase()).subscribe(data => {
				this.services = [...data];
				this.cdr?.markForCheck();
			}),
		);
	}
	onStepDone(service: Service | undefined): void {
		if (service) {
			this.choisenService = service.id;
			this.stepDone?.emit({
				service: service.title,
				serviceId: service.id,
			});
		}
	}
}
