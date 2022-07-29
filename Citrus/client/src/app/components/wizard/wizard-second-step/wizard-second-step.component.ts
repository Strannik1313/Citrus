import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
} from '@angular/core';
import { MasterData } from '@interfaces/master-data';
import { ClientData } from '@models/client-data';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-wizard-second-step',
	templateUrl: './wizard-second-step.component.html',
	styleUrls: ['./wizard-second-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardSecondStepComponent implements OnInit {
	private subscription: Subscription = new Subscription();
	private clientData: ClientData = new ClientData();
	public calendarData: Array<Date> = [];
	public masterData: Array<MasterData> = [];
	public choisenMonth: number = new Date().getMonth();
	public choisenDate: Date = new Date();
	constructor(
		private storage: StorageService,
		private http: HttpService,
		private cdr: ChangeDetectorRef,
	) {
		this.storage.setIsWizardStepDone(false);
	}
	ngOnInit(): void {
		this.subscription.add(
			this.storage.clientData$.subscribe(data => {
				this.clientData = data;
			}),
		);
		this.subscription.add(
			this.http
				.getDates(
					this.clientData.serviceId,
					this.choisenMonth,
					this.clientData.masterId,
					this.choisenDate,
				)
				.subscribe(data => {
					this.calendarData = [...data.filteredDates];
					this.masterData = [...data.masters];
					this.cdr.markForCheck();
				}),
		);
	}
	stepDone(): void {
		this.storage.setIsWizardStepDone(true);
	}
	onDateChoisen(date: Date): void {
		this.choisenDate = date;
		this.subscription.add(
			this.http
				.getDates(
					this.clientData.serviceId,
					this.choisenMonth,
					this.clientData.masterId,
					this.choisenDate,
				)
				.subscribe(data => {
					this.calendarData = [...data.filteredDates];
					this.masterData = [...data.masters];
					this.cdr.markForCheck();
				}),
		);
	}
}
