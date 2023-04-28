import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MasterDto } from '@models/MasterDto';

@Component({
	selector: 'app-master-filter',
	templateUrl: './master-filter.component.html',
	styleUrls: ['./master-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterFilterComponent {
	@Input() masters: Array<MasterDto> | null = [];
	@Output() onFilterChange: EventEmitter<MasterDto | null> = new EventEmitter();
	public isOpen = false;
	public btnLabel = 'выберите мастера';

	onFilterClick(master: MasterDto | null): void {
		this.onFilterChange.emit(master);
		this.isOpen = false;
		this.btnLabel = master?.name || 'все мастера';
	}

	trackByFn(index: number, item: MasterDto): string {
		return item?.name;
	}
}
