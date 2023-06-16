import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { CalenderDatesLoaderDto } from '@models/CalenderDatesLoaderDto';
import { ScheduleDto } from '@models/ScheduleDto';
import { ScheduleLoaderDto } from '@models/ScheduleLoaderDto';
import { MonthsLoaderDto } from '@models/MonthsLoaderDto';
import { MonthsDto } from '@models/MonthsDto';

@Injectable({
	providedIn: 'root',
})
export class CalendarService {
	constructor(private http: HttpClient) {}

	getDates(params: CalenderDatesLoaderDto): Observable<Array<CalendarDatesDto>> {
		return this.http.post<Array<CalendarDatesDto>>('/api/calendar', {
			serviceId: params.serviceId?.toString(),
			masterId: params.masterId,
			week: params.week,
		});
	}

	getSchedule(body: ScheduleLoaderDto): Observable<Array<ScheduleDto>> {
		return this.http.post<Array<ScheduleDto>>('/api/calendar/schedule', {
			date: body.date,
			masterId: body.masterId,
		});
	}

	getMonths(body: MonthsLoaderDto): Observable<MonthsDto> {
		return this.http.get<MonthsDto>('/api/calendar/months', {
			params: new HttpParams().set('currentMonth', body.currentMonth),
		});
	}
}
