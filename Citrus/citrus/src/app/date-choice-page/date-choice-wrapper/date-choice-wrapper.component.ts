import { Component, OnInit } from '@angular/core';
import { CalendarData } from 'src/app/interfaces/calendar-data';
import { StudioData } from 'src/app/interfaces/studio-data';
import { CalendarService } from 'src/app/services/calendar.service';
import { HttpService } from 'src/app/services/http.service';
import { CustomCalendarHeader } from './date-choice-layout/custom-calendar-header/custom-calendar-header.component';

@Component({
  selector: 'app-date-choice-wrapper',
  templateUrl: './date-choice-wrapper.component.html',
  styleUrls: ['./date-choice-wrapper.component.scss']
})
export class DateChoiceWrapperComponent implements OnInit {

  customHeader = CustomCalendarHeader
  calendarValues: CalendarData = {
    date: new Date,
    month: 0,
    day: 0,
    array: []
  }
  studioData: StudioData = {
    maxLoad: 0,
    arrayOfFreeTimes: []
  }
  constructor(
    private calendarService: CalendarService,
    private http: HttpService
  ) {
    this.calendarValues = this.calendarService.getData()
    this.http.getCalendarData()
      .subscribe((response) => {
        this.studioData = response
      })
  }

  ngOnInit(): void {
  }

}
