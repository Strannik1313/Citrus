import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  @Input() customHeader: any
  @Input() date: Date = new Date
  @Input() selected: Date | null  = null
  @Output() selectedChange: EventEmitter<Date> = new EventEmitter
  date2: Date = new Date(2022, 2, 10)
  date3: Date = new Date(2022, 3, 8)
  date4: Date = new Date(2022, 4, 30)
  constructor() { }
  ngOnInit(): void { }
  disableDate = (d: Date): boolean => {
    return d.getDate() !== this.date2.getDate();
  }
  dateSelected(e: Date | null): void {
    if (e) this.selectedChange.emit(e)
  }
}


