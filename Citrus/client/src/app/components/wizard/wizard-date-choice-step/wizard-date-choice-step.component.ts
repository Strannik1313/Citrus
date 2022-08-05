import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	Input,
	OnDestroy,
} from '@angular/core';
import { ClientInitValue } from '@constants/client-init-value';
import { Client } from '@interfaces/client';
import { Order } from '@interfaces/order';
import { Master } from '@models/master-data';
import { HttpService } from '@services/http.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-wizard-date-choice-step',
	templateUrl: './wizard-date-choice-step.component.html',
	styleUrls: ['./wizard-date-choice-step.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardDateChoiceStepComponent implements OnInit, OnDestroy {
	@Input() client: Client = ClientInitValue;
	private subscription: Subscription = new Subscription();
	private today: Date = new Date();
	public choisenDate: Date | null = null;
	public calendarActiveDates: Array<Date> = [];
	public masters: Array<Master> = [];
	public orderCards: Array<Order> = [];
	public choisenMaster: number | null = null;
	constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}
	ngOnInit(): void {
		if (this.client.serviceId !== null) {
			this.subscription.add(
				this.http
					.getDates(this.client.serviceId, this.today, this.today)
					.subscribe(data => {
						data.length > 0
							? (this.choisenDate = data[0])
							: (this.choisenDate = null);
						this.calendarActiveDates = data;
						this.cdr.markForCheck();
					}),
			);
			this.subscription.add(
				this.http
					.getMasters(this.client.serviceId, this.client.masterId)
					.subscribe(data => {
						this.masters = data;
						this.cdr.markForCheck();
					}),
			);
			// this.subscription.add(
			// 	this.http
			// 		.getOrders(
			// 			this.client.serviceId,
			// 			this.choisenDate,
			// 			this.client.masterId,
			// 		)
			// 		.subscribe(data => {
			// 			this.orderCards = data;
			// 			this.cdr.markForCheck();
			// 		}),
			// );
		}
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	onDateChoisen(date: Date): void {
		date;
	}
	onMasterFilterChange(id: number): void {
		id;
	}
}
