import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges,
	ChangeDetectorRef,
} from '@angular/core';

@Component({
	selector: 'app-timepicker',
	templateUrl: './timepicker.component.html',
	styleUrls: ['./timepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerComponent implements OnChanges {
	@Input() time: Array<string> = [];
	@Input() interval: Array<string> | null = [];
	@Output() onTimeChange: EventEmitter<string> = new EventEmitter();
	public buttonOpen = false;
	public content: Array<string> = [];
	constructor(private cdr: ChangeDetectorRef) {}
	ngOnChanges(changes: SimpleChanges): void {
		this.content = changes.time?.currentValue ?? [];
	}
	onTimeClick(time: string): void {
		this.buttonOpen = !this.buttonOpen;
		this.onTimeChange.emit(time);
	}
	onNextTimeClick(): void {
		this.content = this.content.map((item, index, array) => {
			let count = index;
			count++;
			if (count > this.content.length - 1) {
				count = 0;
			}
			return this.content[count];
		});
		this.cdr.markForCheck();
		this.onTimeChange.emit(this.content[0]);
	}
	onPrevTimeClick(): void {
		this.content = this.content.map((item, index, array) => {
			let count = index;
			count--;
			if (count < 0) {
				count = this.content.length - 1;
			}
			return this.content[count];
		});
		this.cdr.markForCheck();
		this.onTimeChange.emit(this.content[0]);
	}
}
