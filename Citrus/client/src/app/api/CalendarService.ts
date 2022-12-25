import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarDates } from '@models/calendar-dates';
import { DatesDto } from '@models/DatesDto';

@Injectable({
	providedIn: 'root',
})
export class CalendarService {
	constructor(private http: HttpClient) {}
	getDates(params: DatesDto): Observable<Array<CalendarDates>> {
		return this.http.post<Array<CalendarDates>>('/api/calendar', {
			serviceId: params.serviceId,
			masterId: params.masterId,
		});
	}
}
