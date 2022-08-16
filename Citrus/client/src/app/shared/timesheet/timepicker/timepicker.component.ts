import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	ChangeDetectorRef,
} from '@angular/core';
import dayjs from 'dayjs';

@Component({
	selector: 'app-timepicker',
	templateUrl: './timepicker.component.html',
	styleUrls: ['./timepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerComponent {
	@Input() time = '';
	@Input() interval: Array<string> | null = [];
	@Output() onBtnClick: EventEmitter<boolean> = new EventEmitter();
	public buttonOpen = false;
	public label = '<';
	public isOpen = false;
	public content: Array<string> = [];
	constructor(private cdr: ChangeDetectorRef) {}
	onTimeClick(): void {
		this.buttonOpen = !this.buttonOpen;
		if (this.interval !== null) {
			this.content = this.interval;
		}
	}
	onNextTimeClick(event: Event): void {
		this.content = this.content.map((item, index, array) => {
			let count = index;
			count++;
			if (count > this.content.length - 1) {
				count = 0;
			}
			return this.content[count];
		});
		this.time = dayjs(this.time).minute(Number(this.content[0])).toString();
		this.cdr.markForCheck();
		event.stopPropagation();
	}
	onPrevTimeClick(event: Event): void {
		this.content = this.content.map((item, index, array) => {
			let count = index;
			count--;
			if (count < 0) {
				count = this.content.length - 1;
			}
			return this.content[count];
		});
		this.time = dayjs(this.time).minute(Number(this.content[0])).toString();
		this.cdr.markForCheck();
		event.stopPropagation();
	}
}
