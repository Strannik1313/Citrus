import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	Input,
	OnDestroy,
} from '@angular/core';
import { CLIENT_INIT_VALUE } from '@constants/client-init-value';
import { MAX_SERVICE_DURATION } from '@constants/max-service-duration';
import { Client } from '@interfaces/client';
import { CalendarDates } from '@models/calendar-dates';
import { Master } from '@models/master-data';
import { Timesheet } from '@models/timesheet';
import { HttpService } from '@services/http.service';
import { Dayjs } from 'dayjs';
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
	private calendarDates: Array<CalendarDates> = [];
	public calendarActiveDates: Array<string> = [];
	public masters: Array<Master> = [];
	public timesheets: Array<Timesheet> = [];
	public extraTimeInterval: Array<string> = [];
	public selectedMasterId: number | null = null;
	public currentMonth: Dayjs | null = null;
	constructor(private http: HttpService, private cdr: ChangeDetectorRef) {}
	ngOnInit(): void {
		this.subscription.add(
			this.http
				.getMasters(this.client.serviceId!, this.selectedMasterId)
				.subscribe(data => {
					this.masters = data;
					this.cdr.markForCheck();
				}),
		);
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	onDaySelected(date: string): void {
		this.subscription.add(
			this.http
				.getTimesheets(this.client.serviceId!, date, this.selectedMasterId)
				.subscribe(data => {
					this.timesheets = data;
					if (data.length > 0) {
						for (
							let i = 0;
							i <= MAX_SERVICE_DURATION - this.timesheets[0].duration;
							i = i + 10
						) {
							this.extraTimeInterval.push(
								i.toString().length === 1 ? i.toString() + '0' : i.toString(),
							);
						}
					}
					this.cdr.markForCheck();
				}),
		);
	}
	onWeekChange(range: { startDay: string; endDay: string }): void {
		this.timesheets = [];
		this.subscription.add(
			this.http
				.getDates(this.client.serviceId!, range.startDay, range.endDay)
				.subscribe(data => {
					this.calendarDates = data;
					this.createActiveDates(this.calendarDates);
					this.cdr.markForCheck();
				}),
		);
	}
	onMasterFilterChange(id: number | null): void {
		this.selectedMasterId = id;
		this.createActiveDates(this.calendarDates);
		this.cdr.markForCheck();
	}
	onMonthFilterChange(month: Dayjs | null): void {
		this.currentMonth = month;
	}
	private createActiveDates(dates: Array<CalendarDates>): void {
		if (this.selectedMasterId !== null) {
			this.calendarActiveDates = dates
				.filter(value => {
					return value.masterIds.includes(this.selectedMasterId!);
				})
				.map(value => {
					return value.date;
				});
		} else {
			this.calendarActiveDates = dates.map(value => {
				return value.date;
			});
		}
		// this.calendarActiveDates = (
		// 	!!this.selectedMasterId
		// 		? dates.filter(value => {
		// 				return value.masterIds.includes(this.selectedMasterId!);
		// 		  })
		// 		: dates
		// ).map(value => {
		// 	return value.date;
		// });
	}
}
