import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
	selector: 'app-month-filter',
	templateUrl: './month-filter.component.html',
	styleUrls: ['./month-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthFilterComponent {
	@Input() months: Array<string> | null = [];
	@Input() selectedMonth: string | null = null;
	@Input() label = '';
	@Output() onMonthSelected: EventEmitter<string | null> = new EventEmitter();

	onFilterClick(item: MatSelectChange): void {
		this.onMonthSelected.emit(item.value);
	}
}
