import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { MasterData } from '@models/master-data';

@Component({
	selector: 'app-master-filter',
	templateUrl: './master-filter.component.html',
	styleUrls: ['./master-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterFilterComponent {
	@Input() masterData: Array<MasterData> = [];
	@Output() filterChange: EventEmitter<number> = new EventEmitter();
	onFilterClick(id: number): void {
		this.filterChange.emit(Number(id));
	}
	trackByFn(index: number, item: MasterData): string {
		return item?.name;
	}
}
