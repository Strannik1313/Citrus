// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Service } from '@interfaces/service';
// import { Master } from '@models/master';
// import { CalendarDates } from '@models/calendar-dates';
// import { Timesheet } from '@models/timesheet';

// @Injectable({
// 	providedIn: 'root',
// })
// export class HttpService {
// 	constructor(private http: HttpClient) {}

// 	getDates(
// 		serviceId: number,
// 		dateRangeStart: string,
// 		dateRangeEnd: string,
// 	): Observable<Array<CalendarDates>> {
// 		return this.http.post<Array<CalendarDates>>('/api/calendar', {
// 			serviceId,
// 			dateRangeStart,
// 			dateRangeEnd,
// 		});
// 	}

// 	getMasters(
// 		serviceId: number,
// 		masterId: number | null,
// 	): Observable<Array<Master>> {
// 		return this.http?.post<Array<Master>>('/api/masters', {
// 			serviceId,
// 			masterId,
// 		});
// 	}

// 	getTimesheets(
// 		serviceId: number,
// 		date: string | null,
// 		masterId: number | null,
// 	): Observable<Array<Timesheet>> {
// 		return this.http.post<Array<Timesheet>>('/api/calendar/timesheets', {
// 			serviceId,
// 			date,
// 			masterId,
// 		});
// 	}

// 	getServices(): Observable<Array<Service>> {
// 		return this.http?.get<Array<Service>>('/api/services');
// 	}
// }
