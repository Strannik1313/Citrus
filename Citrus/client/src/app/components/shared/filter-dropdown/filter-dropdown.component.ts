import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FilterItem } from '@shared/filter-dropdown/interfaces/FilterItem';
import { MatSelectChange } from '@angular/material/select';

@Component({
	selector: 'app-filter-dropdown',
	templateUrl: './filter-dropdown.component.html',
	styleUrls: ['./filter-dropdown.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class FilterDropdownComponent {
	@Input() items: Array<FilterItem> | null = [];
	@Input() label = '';
	@Input() selectedItem: FilterItem | null = null;
	@Output() onFilterChange: EventEmitter<FilterItem | null> = new EventEmitter();

	onFilterClick(item: MatSelectChange): void {
		this.onFilterChange.emit(item.value);
	}

	trackByFn(index: number, item: FilterItem): string | number {
		return item.name;
	}
}
