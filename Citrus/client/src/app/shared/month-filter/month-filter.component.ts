import {
	Component,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	Input,
} from '@angular/core';
import dayjs from 'dayjs';

const BTN_LABEL_DEF = 'месяц не выбран';

@Component({
	selector: 'app-month-filter',
	templateUrl: './month-filter.component.html',
	styleUrls: ['./month-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthFilterComponent {
	@Input() months: Array<string> = [];
	@Output() onMonthSelected: EventEmitter<string | null> = new EventEmitter();
	public isOpen: boolean = false;
	public btnLabel: string = BTN_LABEL_DEF;
	onFilterClick(month: string | null): void {
		this.isOpen = false;
		if (month !== null) {
			this.btnLabel = dayjs(month).format('MMMM');
		} else {
			this.btnLabel = BTN_LABEL_DEF;
		}
		this.onMonthSelected.emit(month);
	}
	trackByFn(index: number, item: string): string {
		return item;
	}
}
