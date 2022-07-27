import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	OnDestroy,
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
	public isChoisen: number | undefined;
	public services: Service[] = [];
	private subscriptions: Subscription[] = [];
	constructor(
		private storage: StorageService,
		private filter: FilterService,
		private http: HttpService,
		private cdr: ChangeDetectorRef,
	) {
		this.storage.setIsWizardStepDone(false);
	}
	ngOnInit(): void {
		this.http.getServices().subscribe(data => {
			this.services = [...data];
			this.filter.setData(this.services);
			this.cdr.detectChanges();
		});
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
	filterChange(value: string): void {
		this.subscriptions.push(
			this.filter.setFilter(value.toLocaleLowerCase()).subscribe(data => {
				this.services = [...data];
				this.cdr.detectChanges();
			}),
		);
	}
	stepDone(service: Service, index: number): void {
		this.isChoisen = index;
		this.storage.setIsWizardStepDone(true);
		this.storage.setClientData({
			name: 'services',
			value: service.title,
		});
	}
	trackByFn(index: number, item: Service): string {
		return item.title;
	}
}
