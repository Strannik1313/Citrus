import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	OnDestroy,
	Input,
} from '@angular/core';
import { Service } from '@models/service';
import { FilterService } from '@services/filter.service';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';
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
	public services: Service[] = [];
	private subscriptions: Subscription[] = [];
	constructor(
		private storage: StorageService,
		private filter: FilterService<Service>,
		private http: HttpService,
		private cdr: ChangeDetectorRef,
	) {}
	ngOnInit(): void {
		this.subscriptions.push(
			this.http.getServices().subscribe(data => {
				this.services = [...data];
				this.filter.setData(this.services);
				this.cdr.markForCheck();
				if (this.choisenService !== -1) {
					this.storage.setClientData({
						name: 'services',
						value: this.services[this.choisenService].title,
						id: this.services[this.choisenService].id,
					});
					this.storage.setIsWizardStepDone(true);
				}
			}),
		);
	}
	ngOnDestroy(): void {
		if (!this.shouldClientDataBeSaved) {
			this.storage.setClientData({
				name: 'services',
				value: '',
				id: -1,
			});
			this.storage.setIsWizardStepDone(false);
		}
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
	filterChange(value: string): void {
		this.subscriptions.push(
			this.filter.setFilter(value.toLocaleLowerCase()).subscribe(data => {
				this.services = [...data];
				this.cdr.markForCheck();
			}),
		);
	}
	stepDone(service: Service, index: number): void {
		this.choisenService = index;
		this.storage.setClientData({
			name: 'services',
			value: service.title,
			id: service.id,
		});
		this.storage.setIsWizardStepDone(true);
	}
	trackByFn(index: number, item: Service): string {
		return item.title;
	}
}
