import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'app-timepicker',
	templateUrl: './timepicker.component.html',
	styleUrls: ['./timepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerComponent {
	@Input() time: string = '';
	@Input() interval: Array<string> = [];
	public isOpen: boolean = false;
}
