import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarData } from 'src/app/interfaces/calendar-data';
import { StudioData } from 'src/app/interfaces/studio-data';

@Component({
  selector: 'app-date-choice-layout',
  templateUrl: './date-choice-layout.component.html',
  styleUrls: ['./date-choice-layout.component.scss']
})
export class DateChoiceLayoutComponent implements OnInit {
  @Input() customHeader: any
  @Input() masterName: string = ''
  @Input() selected: Date | null = null
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
  @Output() dateWasSelected: EventEmitter<Date> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }
  dateSelected(e: any): void {
    this.dateWasSelected.emit(e)
  }
}
