import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarDates } from '@models/calendar-dates';
import { DatesDto } from '@models/DatesDto';
import { Schedule } from '@models/schedule';
import { ScheduleDto } from '@models/ScheduleDto';

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

  getSchedule(body: ScheduleDto): Observable<Array<Schedule>> {
    return this.http.post<Array<Schedule>>('/api/calendar/schedule', {
      serviceId: body.serviceId,
      date: body.date,
    });
  }
}
