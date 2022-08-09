import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	Input,
	OnDestroy,
} from '@angular/core';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { Client } from '@interfaces/client';
import { Order } from '@interfaces/order';
import { CalendarDatesAndId } from '@models/calendar-dates-and-id';
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
	@Input() client: Client = CLIENT_INIT_VALUE;
	private subscription: Subscription = new Subscription();
	private calendarDatesAndId: Array<CalendarDatesAndId> = [];
	public calendarActiveDates: Array<Date> = [];
	public masters: Array<Master> = [];
	public orderCards: Array<Order> = [];
	public choisenMasterId: number | null = null;
	public choisenMonth: number = 0;
	constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}
	ngOnInit(): void {
		if (this.client.serviceId !== null) {
			this.subscription.add(
				this.http
					.getMasters(this.client.serviceId, this.choisenMasterId)
					.subscribe(data => {
						this.masters = data;
						this.cdr.markForCheck();
					}),
			);
		}
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	onDateChoisen(date: Date): void {
		if (this.client.serviceId !== null) {
			this.subscription.add(
				this.http
					.getOrders(this.client.serviceId, date, this.choisenMasterId)
					.subscribe(data => {
						this.orderCards = data;
						this.cdr.markForCheck();
					}),
			);
		}
	}
	onDateRangeChoisen(range: { startDay: Date; endDay: Date }): void {
		this.choisenMonth = range.startDay.getMonth();
		if (this.client.serviceId !== null) {
			this.subscription.add(
				this.http
					.getDates(this.client.serviceId, range.startDay, range.endDay)
					.subscribe(data => {
						this.calendarDatesAndId = data;
						this.setActiveDates(this.calendarDatesAndId);
						this.cdr.markForCheck();
					}),
			);
		}
	}
	onMasterFilterChange(id: number | null): void {
		this.choisenMasterId = id;
		this.setActiveDates(this.calendarDatesAndId);
		this.cdr.markForCheck();
	}
	onMonthFilterChange(month: number): void {
		this.choisenMonth = month;
	}
	setActiveDates(calendarDatesAndId: Array<CalendarDatesAndId>): void {
		this.calendarActiveDates = (
			!!this.choisenMasterId
				? calendarDatesAndId.filter(value => {
						return value.mastersId.includes(<number>this.choisenMasterId);
				  })
				: calendarDatesAndId
		).map(value => {
			return value.date;
		});
	}
}
