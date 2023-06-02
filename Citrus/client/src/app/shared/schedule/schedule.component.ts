import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleDto } from '@models/ScheduleDto';

@Component({
	selector: 'app-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
	@Input() schedules: Array<ScheduleDto> | null = [];
	@Input() selectedSchedule: ScheduleDto | null = null;
	@Output() onTimeChange: EventEmitter<ScheduleDto> = new EventEmitter();
	@Output() onScheduleSelected: EventEmitter<ScheduleDto> = new EventEmitter();

	timeChange(dateOrder: string, schedule: ScheduleDto): void {
		this.onTimeChange.emit({
			...schedule,
			preOrder: dateOrder,
		});
	}

	scheduleSelected(schedule: ScheduleDto): void {
		this.onScheduleSelected.emit({ ...schedule });
	}

	trackByFn(index: number, item: Array<string> | ScheduleDto): number {
		return index;
	}
}
