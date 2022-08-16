import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { Master } from '@models/master';

@Component({
	selector: 'app-master-filter',
	templateUrl: './master-filter.component.html',
	styleUrls: ['./master-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterFilterComponent {
	@Input() masters: Array<Master> | null = [];
	@Output() onFilterChange: EventEmitter<number | null> = new EventEmitter();
	public isOpen = false;
	public btnLabel = 'выберите мастера';
	onFilterClick(id: number | null, label: string): void {
		this.onFilterChange.emit(id);
		this.isOpen = false;
		this.btnLabel = label;
	}
	trackByFn(index: number, item: Master): string {
		return item?.name;
	}
}
