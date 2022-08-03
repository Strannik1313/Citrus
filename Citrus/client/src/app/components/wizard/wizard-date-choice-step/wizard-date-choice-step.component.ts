import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	Input,
	OnDestroy,
} from '@angular/core';
import { Client } from '@interfaces/client';
import { MasterCard } from '@interfaces/free-times';
import { MasterData } from '@models/master-data';
import { HttpService } from '@services/http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-wizard-date-choice-step',
	templateUrl: './wizard-date-choice-step.component.html',
	styleUrls: ['./wizard-date-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardDateChoiceStepComponent implements OnInit, OnDestroy {
	@Input() clientData: Client = {
		masterId: -1,
		masterName: '',
		serviceName: '',
		serviceId: -1,
		name: '',
		surname: '',
		phoneNumber: '',
		dateOrder: null,
	};
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
