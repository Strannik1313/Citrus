import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-timepicker',
	templateUrl: './timepicker.component.html',
	styleUrls: ['./timepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerComponent {
	@Input() time: Array<string[]> = [];
	@Input() selectedTime: string | null = '';
	@Output() onTimeSelected: EventEmitter<string> = new EventEmitter();
	openedPanelNumber: number | null = null;

	timeSelected(time: string) {
		this.onTimeSelected.emit(time);
		this.openedPanelNumber = null;
	}
	onBackdropClick() {
		this.openedPanelNumber = null;
	}

	timeBtnClick(index: number) {
		this.openedPanelNumber = index;
	}
}
