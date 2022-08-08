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
	onFilterClick(id: number | null): void {
		this.filterChange.emit(id);
	}
	trackByFn(index: number, item: Master): string {
		return item?.name;
	}
}
