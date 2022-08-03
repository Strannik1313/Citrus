import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	Input,
	OnDestroy,
} from '@angular/core';
import { MasterCard } from '@interfaces/free-times';
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
	private subscription: Subscription = new Subscription();
	public choisenDate: Date = new Date();
	public calendarData: Array<Date> = [];
	public masterData: Array<MasterData> = [];
	public masterCard: Array<MasterCard> = [];
	public choisenMonth: number = new Date().getMonth();
	public choisenMaster: number = -1;
	public availableMonth: Array<Date> = [];
	constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}
	ngOnInit(): void {
		this.subscription?.add(
			this.http
				?.getDates(
					this.clientData?.serviceId,
					this.choisenDate,
					this.clientData?.masterId,
				)
				?.subscribe(data => {
					this.calendarData = [...data];
					this.choisenDate = data[0];
					this.cdr.markForCheck();
				}),
		);
		this.subscription?.add(
			this.http
				?.getMasterData(this.clientData?.serviceId, this.clientData?.masterId)
				?.subscribe(data => {
					this.masterData = [...data];
					this.cdr.markForCheck();
				}),
		);
		this.subscription?.add(
			this.http
				?.getMasterCard(
					this.clientData?.serviceId,
					this.choisenDate,
					this.clientData?.masterId,
				)
				?.subscribe(data => {
					this.masterCard = [...data];
					this.cdr.markForCheck();
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
				?.getMasterCard(
					this.clientData?.serviceId,
					this.choisenDate,
					this.choisenMaster,
				)
				?.subscribe(data => {
					this.masterCard = [...data];
					this.cdr.markForCheck();
				}),
		);
	}
	onMasterFilterChange(id: number): void {
		this.choisenMaster = id;
		this.http
			?.getDates(
				this.clientData?.serviceId,
				this.choisenDate,
				this.choisenMaster,
			)
			?.subscribe(data => {
				this.calendarData = [...data];
				this.cdr.markForCheck();
			});
		this.subscription?.add(
			this.http
				?.getMasterCard(
					this.clientData?.serviceId,
					this.choisenDate,
					this.choisenMaster,
				)
				?.subscribe(data => {
					this.masterCard = [...data];
					this.cdr.markForCheck();
				}),
		);
	}
}
