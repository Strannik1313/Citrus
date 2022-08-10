import {
	Component,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	Input,
	OnInit,
} from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';

const BTNLABELDEF = 'месяц не выбран';

@Component({
	selector: 'app-month-filter',
	templateUrl: './month-filter.component.html',
	styleUrls: ['./month-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthFilterComponent implements OnInit {
	@Input() selectedMonth: Dayjs = dayjs().startOf('month');
	@Output() onMonthSelected: EventEmitter<Dayjs | null> = new EventEmitter();
	public isOpen: boolean = false;
	public btnLabel: string = BTNLABELDEF;
	public months: Array<string> = [];
	ngOnInit(): void {
		this.months = this.createMonths(dayjs().startOf('month'));
	}
	onFilterClick(month: string | null): void {
		this.isOpen = false;
		if (month !== null) {
			this.btnLabel = dayjs(month).format('MMMM');
			this.onMonthSelected.emit(dayjs(month));
		} else {
			this.btnLabel = BTNLABELDEF;
			this.onMonthSelected.emit(null);
		}
	}
	trackByFn(index: number, item: string): string {
		return item;
	}
	createMonths(startMonth: Dayjs): Array<string> {
		const month = [];
		for (let i = 0; i < 6; i++) {
			month.push(startMonth.add(i, 'month').toString());
		}
		return month;
	}
}
