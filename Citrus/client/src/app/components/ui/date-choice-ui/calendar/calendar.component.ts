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
  @Input() startDisabledDate: Date | null =null;
  @Input() endDisabledDates: Date | null =null;
  @Input() selected: Date | null  = null;
  @Output() selectedChange: EventEmitter<Date> = new EventEmitter;
  
  dateSelected(e: Date | null): void {
    if (e) this.selectedChange.emit(e);
  };
}

