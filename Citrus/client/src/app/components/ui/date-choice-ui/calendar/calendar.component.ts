import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { CustomCalendarHeader } from 'src/app/components/custom-components-material-ui/custom-calendar-header/custom-calendar-header.component';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnChanges {
	@Input() customHeader = CustomCalendarHeader;
	@Input() startDisabledDate: Date = new Date(1970);
	@Input() endDisabledDates: Date = new Date(1970);
	@Input() selected: Date | null = null;
	@Output() selectedChange: EventEmitter<Date> = new EventEmitter();

	ngOnChanges(changes: SimpleChanges): void {}
	dateSelected(e: Date | null): void {
		if (e) this.selectedChange.emit(e);
	}
}
