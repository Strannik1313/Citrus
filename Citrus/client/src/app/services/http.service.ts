import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Service } from '@interfaces/service';
import { Master } from '@models/master-data';
import { Order } from '@interfaces/order';
import { CalendarDatesAndId } from '@models/calendar-dates-and-id';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	constructor(private http: HttpClient) {}

	getDates(
		serviceId: number,
		dateRangeStart: Date,
		dateRangeEnd: Date,
	): Observable<Array<CalendarDatesAndId>> {
		return this.http
			.post<Array<{ date: string; mastersId: Array<number> }>>(
				'/api/calendar',
				{
					serviceId,
					dateRangeStart,
					dateRangeEnd,
				},
			)
			.pipe(
				map(value => {
					let stringToDate = value.map(item => {
						return {
							date: new Date(item.date),
							mastersId: item.mastersId,
						};
					});
					return stringToDate;
				}),
			);
	}

	getMasters(
		serviceId: number,
		masterId: number | null,
	): Observable<Array<Master>> {
		return this.http?.post<Array<Master>>('/api/masters', {
			serviceId,
			masterId,
		});
	}

	getOrders(
		serviceId: number,
		date: Date | null,
		masterId: number | null,
	): Observable<Array<Order>> {
		return this.http.post<Array<Order>>('/api/calendar/orders', {
			serviceId,
			date,
			masterId,
		});
	}

	getServices(): Observable<Array<Service>> {
		return this.http?.get<Array<Service>>('/api/services');
	}
}
