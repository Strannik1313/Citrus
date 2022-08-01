import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
	@Input() iterableValue: Array<Date> = [];

	trackByFn(index: number, item: Date): Date {
		return item;
	}
}
