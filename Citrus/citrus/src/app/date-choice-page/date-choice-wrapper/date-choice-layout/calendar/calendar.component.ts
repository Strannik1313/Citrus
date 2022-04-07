import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { CalendarData } from 'src/app/interfaces/calendar-data';
import { StudioData } from 'src/app/interfaces/studio-data';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
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
  @Input() selected: Date | null  = null
  @Output() selectedChange: EventEmitter<Date> = new EventEmitter
  date: Date = new Date(2022, 2, 20)
  date2: Date = new Date(2022, 2, 10)
  date3: Date = new Date(2022, 2, 6)
  constructor() { }
  ngOnInit(): void { }
  disableDate = (d: Date): boolean => {
    return d.getDate() !== this.date2.getDate();
  }
  dateSelected(e: Date | null): void {
    if (e) this.selectedChange.emit(e)
  }
}


