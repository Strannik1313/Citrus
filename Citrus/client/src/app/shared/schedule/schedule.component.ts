import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '@models/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {
  @Input() schedules: Array<Schedule> | null = [];
  @Output() onTimeChange: EventEmitter<Schedule> = new EventEmitter();

  timeChange(dateOrder: string, schedule: Schedule): void {
    this.onTimeChange.emit({
      ...schedule,
      preOrder: dateOrder,
    });
  }

  trackByFn(index: number, item: Array<string> | Schedule): number {
    return index;
  }
}
