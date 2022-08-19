import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '@models/service';
import { Master } from '@models/master';
import { CalendarDates } from '@models/calendar-dates';
import { Timesheet } from '@models/timesheet';
import { Client } from '@models/client';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(private http: HttpClient) {}

	getDates(
		serviceId: number,
		dateRangeStart: string,
		masterId: number | null,
	): Observable<Array<CalendarDates>> {
		return this.http.post<Array<CalendarDates>>('/api/calendar', {
			serviceId,
			dateRangeStart,
			masterId,
		});
	}

	getMasters(serviceId: number | null): Observable<Array<Master>> {
		return this.http.post<Array<Master>>('/api/masters', {
			serviceId,
		});
	}

	getTimesheets(
		serviceId: number,
		date: string | null,
		masterId: number | null,
	): Observable<Array<Timesheet>> {
		return this.http.post<Array<Timesheet>>('/api/calendar/timesheets', {
			serviceId,
			date,
			masterId,
		});
	}

	getServices(): Observable<Array<Service>> {
		return this.http.get<Array<Service>>('/api/services');
	}
	makeOrder(formValue: Client): Observable<{ message: boolean }> {
		return this.http.patch<{ message: boolean }>('/api/order', formValue);
	}
}
