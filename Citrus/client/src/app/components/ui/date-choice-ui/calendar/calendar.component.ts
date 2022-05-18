import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomCalendarHeader } from 'src/app/components/custom-components-material-ui/custom-calendar-header/custom-calendar-header.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  @Input() customHeader = CustomCalendarHeader;
  @Input() date: Date = new Date;
  @Input() startDisabledDate: Date = new Date;
  @Input() endDisabledDates: Date = new Date;
  @Input() selected: Date | null  = null;
  @Output() selectedChange: EventEmitter<Date> = new EventEmitter;
  date2: Date = new Date(2022, 2, 10);
  date4: Date = new Date(2022, 4, 30);

  disableDate = (d: Date): boolean => {
    return d.getDate() !== this.date2.getDate();
  };

  dateSelected(e: Date | null): void {
    if (e) this.selectedChange.emit(e);
  };
}


