import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
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
export class DateChoiceWrapperComponent implements OnInit, OnDestroy {
  selected: Date | null = null
  subscriptionCalendar: Subscription = new Subscription
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
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptionCalendar.unsubscribe()
  }
  dateWasSelected(e: Date): void {
    this.subscriptionCalendar = this.http.getCalendarData(e.getDate(), e.getMonth())
      .subscribe((response) => {
        this.studioData = response
        this.selected = e
      console.log(this.studioData)
      })
  }
}
