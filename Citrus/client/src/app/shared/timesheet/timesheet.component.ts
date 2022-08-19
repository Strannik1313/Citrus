import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { ChoisenDate } from '@models/client';
import { Timesheet } from '@models/timesheet';

@Component({
	selector: 'app-timesheet',
	templateUrl: './timesheet.component.html',
	styleUrls: ['./timesheet.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetComponent {
	@Input() timesheets: Array<Timesheet> | null = [];
	@Output() onTimeChange: EventEmitter<ChoisenDate> = new EventEmitter();
	timeChange(dateOrder: string, masterId: number, masterName: string): void {
		this.onTimeChange.emit({ masterName, masterId, dateOrder });
	}
	trackByFn(index: number, item: Array<string> | Timesheet): number {
		return index;
	}
}
