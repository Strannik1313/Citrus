import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
} from '@angular/core';
import { Service } from '@models/service';
import { FilterService } from '@services/filter.service';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';

@Component({
	selector: 'app-wizard-first-step',
	templateUrl: './wizard-first-step.component.html',
	styleUrls: ['./wizard-first-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardFirstStepComponent implements OnInit {
	public filteredServices: Service[] = [];
	public isChoisen: number | undefined;
	public inputValue: string = '';
	private services: Service[] = [];
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
			this.filteredServices = [...data];
			this.filter.setData(this.services);
			this.cdr.detectChanges();
		});
	}
	stepDone(service: Service, index: number): void {
		this.isChoisen = index;
		this.storage.setIsWizardStepDone(true);
	}
	filterChange(): void {
		this.filter.setFilter(this.inputValue).subscribe(data => {
			this.filteredServices = [...data];
			this.cdr.detectChanges();
		});
	}
	trackByFn(index: number, item: Service): string {
		return item.title;
	}
}
