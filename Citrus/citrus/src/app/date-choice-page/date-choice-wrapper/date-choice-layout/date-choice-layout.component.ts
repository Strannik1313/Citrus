import { Component, Input, OnInit } from '@angular/core';
import { CalendarData } from 'src/app/interfaces/calendar-data';
import { StudioData } from 'src/app/interfaces/studio-data';

@Component({
  selector: 'app-date-choice-layout',
  templateUrl: './date-choice-layout.component.html',
  styleUrls: ['./date-choice-layout.component.scss']
})
export class DateChoiceLayoutComponent implements OnInit {
  @Input() customHeader: any
  @Input() calendarValues: CalendarData = {
    date: new Date,
    month: 0,
    day: 0,
    array: []
  }
  @Input() studioData: StudioData = {
    maxLoad: 0,
    arrayOfFreeTimes: []
  }
  constructor() { }

  ngOnInit(): void {
  }
  
}
