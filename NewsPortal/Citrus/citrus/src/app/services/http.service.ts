import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CalendarData } from '../interfaces/calendar-data';
import { StudioData } from '../interfaces/studio-data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  getCalendarData(): Observable<StudioData> {
    return this.http.get<StudioData>('https://jsonplaceholder.typicode.com/todos/1')
    .pipe (map((response)=>{
      
      return {
        arrayOfFreeTimes: [10, 12, 14, 16, 18],
        maxLoad: 5
      }
    }))
     
  }

}
