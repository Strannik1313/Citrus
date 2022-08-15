import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Timesheet } from '@models/timesheet';

@Component({
	selector: 'app-timesheet',
	templateUrl: './timesheet.component.html',
	styleUrls: ['./timesheet.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetComponent {
	@Input() timesheets: Array<Timesheet> = [];
	@Input() interval: Array<string> = [];
	@Input() selectedMaster: number | null = null;
	trackByFn(index: number, item: Timesheet | string): number {
		return index;
	}
}
