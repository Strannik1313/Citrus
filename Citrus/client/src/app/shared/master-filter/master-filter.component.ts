import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { Master } from '@models/master-data';

@Component({
	selector: 'app-master-filter',
	templateUrl: './master-filter.component.html',
	styleUrls: ['./master-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterFilterComponent {
	@Input() masters: Array<Master> = [];
	@Output() filterChange: EventEmitter<number | null> = new EventEmitter();
	public isOpen: boolean = false;
	public btnLabel: string = 'выберите мастера';
	onFilterClick(id: number | null, label: string): void {
		this.filterChange.emit(id);
		this.isOpen = false;
		this.btnLabel = label;
	}
	trackByFn(index: number, item: Master): string {
		return item?.name;
	}
}
