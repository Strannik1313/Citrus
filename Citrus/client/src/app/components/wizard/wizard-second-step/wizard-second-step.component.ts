import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	Input,
	OnDestroy,
} from '@angular/core';
import { ClientData } from '@models/client-data';
import { MasterData } from '@models/master-data';
import { HttpService } from '@services/http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-wizard-second-step',
	templateUrl: './wizard-second-step.component.html',
	styleUrls: ['./wizard-second-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardSecondStepComponent implements OnInit, OnDestroy {
	@Input() clientData: ClientData = new ClientData();
	@Input() choisenDate: Date = new Date();
	private subscription: Subscription = new Subscription();
	public calendarData: Array<Date> = [];
	public masterData: Array<MasterData> = [];
	public choisenMonth: number = new Date().getMonth();
	public availableMonth: Array<Date> = [];
	constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}
	ngOnInit(): void {
		this.subscription?.add(
			this.http
				?.getDates(
					this.clientData?.serviceId,
					this.choisenMonth,
					this.clientData?.masterId,
					this.choisenDate,
				)
				?.subscribe(data => {
					this.calendarData = [...data?.filteredDates];
					this.masterData = [...data?.masters];
					this.choisenDate = data?.filteredDates[0];
					this.availableMonth = data.availableMonths;
					this.cdr?.markForCheck();
				}),
		);
	}
	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
	onDateChoisen(date: Date): void {
		this.choisenDate = date;
		this.subscription?.add(
			this.http
				?.getDates(
					this.clientData?.serviceId,
					this.choisenMonth,
					this.clientData?.masterId,
					this.choisenDate,
				)
				?.subscribe(data => {
					this.calendarData = [...data.filteredDates];
					this.masterData = [...data.masters];
					this.cdr.markForCheck();
				}),
		);
	}
	onFilterClick(item: Date | MasterData): void {
		item;
	}
}
