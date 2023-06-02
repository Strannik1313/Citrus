import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '@models/Schedule';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
	@Input() schedules: Array<Schedule> | null = [];
	@Input() selectedSchedule: Schedule | null = null;
	@Output() onTimeChange: EventEmitter<Schedule> = new EventEmitter();
	@Output() onScheduleSelected: EventEmitter<Schedule> = new EventEmitter();

	timeChange(dateOrder: string, schedule: Schedule): void {
		this.onTimeChange.emit({
			...schedule,
			preOrder: dateOrder,
		});
	}

	scheduleSelected(schedule: Schedule): void {
		this.onScheduleSelected.emit({ ...schedule });
	}

	trackByFn(index: number, item: Schedule): string {
		return item.id;
	}
}
