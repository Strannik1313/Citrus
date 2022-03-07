import { Component, OnInit } from '@angular/core';
import { CalendarData } from 'src/app/interfaces/calendar-data';
import { StudioData } from 'src/app/interfaces/studio-data';
import { CalendarService } from 'src/app/services/calendar.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  calendarValues: CalendarData = {
    date: new Date,
    month: 0,
    day: 0,
    array: []
  }
  clientCount: number = 0
  studioData: StudioData = {
    maxLoad: 0,
    arrayOfFreeTimes: []
  }
  
  constructor(
    private calendarData: CalendarService,
    private http: HttpService) { }

  ngOnInit(): void {
    this.calendarValues = this.calendarData.getData()
    this.http.getCalendarData()
    .subscribe ((response)=>{
      if (response.maxLoad > 0) this.clientCount = 100-(((response.arrayOfFreeTimes.length)*100)/(response.maxLoad-1))
      this.studioData = response
    })
    
  }

  
}
