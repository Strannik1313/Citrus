import { DatePipe } from '@angular/common';
import {
	Component,
	ChangeDetectionStrategy,
	Input,
	OnChanges,
	SimpleChanges,
	Output,
	EventEmitter,
} from '@angular/core';
import { MasterData } from '@models/master-data';
import { FilterService } from '@services/filter.service';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
	providers: [FilterService, DatePipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnChanges {
	@Input() iterableValue: Array<Date | MasterData> = [];
	@Output() selectedItem: EventEmitter<Date | MasterData> = new EventEmitter();
	public iterableArray: Array<string> = [];
	constructor(private filter: FilterService) {}
	ngOnChanges(changes: SimpleChanges): void {
		let chng = changes['iterableValue'];
		if (!chng.firstChange) {
			this.iterableArray = this.filter.getIterableValues(
				changes['iterableValue'].currentValue,
			);
		}
	}
	onItemClick(item: string): void {
		this.selectedItem.emit(this.filter.getValueForEmit(item));
	}
	trackByFn(index: number, item: string): string {
		return item;
	}
}
