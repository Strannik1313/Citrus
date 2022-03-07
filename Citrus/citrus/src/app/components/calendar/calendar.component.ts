import { Component, OnInit } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
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
  date: Date = new Date (2022, 2, 20)
  date2: Date = new Date (2022, 2, 10)
  date3: Date = new Date (2022, 2, 6)
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
  selected: Date | null = null;
  
  constructor(
    private calendarService: CalendarService,
    private http: HttpService
    ) { }
   

  ngOnInit(): void {
    this.calendarValues = this.calendarService.getData()
    this.http.getCalendarData()
    .subscribe ((response)=>{
      if (response.maxLoad > 0) this.clientCount = 100-(((response.arrayOfFreeTimes.length)*100)/(response.maxLoad-1))
      this.studioData = response
    })
    
  }
  disableDate = (d: Date): boolean => {
    
   
    // Even dates are disabled.
    return d.getDate() !== this.date2.getDate();
  }
  
}
