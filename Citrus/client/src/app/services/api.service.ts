import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceDto } from '@models/ServiceDto';
import { MasterDto } from '@models/MasterDto';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { ScheduleDto } from '@models/ScheduleDto';
import { Client } from '@models/client';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(private http: HttpClient) {}

	getDates(serviceId: number, dateRangeStart: string, masterId: number | null): Observable<Array<CalendarDatesDto>> {
		return this.http.post<Array<CalendarDatesDto>>('/api/calendar', {
			serviceId,
			dateRangeStart,
			masterId,
		});
	}

	getMasters(serviceId: number | null, masterId: number | null): Observable<Array<MasterDto>> {
		return this.http.post<Array<MasterDto>>('/api/masters', {
			serviceId,
			masterId,
		});
	}

	getTimesheets(serviceId: number, date: string | null, masterId: number | null): Observable<Array<ScheduleDto>> {
		return this.http.post<Array<ScheduleDto>>('/api/calendar/timesheets', {
			serviceId,
			date,
			masterId,
		});
	}

	getServices(): Observable<Array<ServiceDto>> {
		return this.http.get<Array<ServiceDto>>('/api/services');
	}

	makeOrder(formValue: Client): Observable<{ message: boolean }> {
		return this.http.patch<{ message: boolean }>('/api/order', formValue);
	}
}
