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
	@Input() selectedTime: string | null = null;
	@Output() onTimeChange: EventEmitter<Schedule> = new EventEmitter();

	timeChange(time: string, schedule: Schedule): void {
		this.onTimeChange.emit({
			...schedule,
			preOrder: time,
		});
	}

	trackByFn(index: number, item: Schedule): string {
		return item.id;
	}
}
