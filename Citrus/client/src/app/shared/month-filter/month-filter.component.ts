import {
	Component,
	ChangeDetectionStrategy,
	Output,
	EventEmitter,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

@Component({
	selector: 'app-month-filter',
	templateUrl: './month-filter.component.html',
	styleUrls: ['./month-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthFilterComponent implements OnChanges {
	@Input() choisenMonth: number = 0;
	@Output() monthChoisen: EventEmitter<number> = new EventEmitter();
	public isOpen: boolean = false;
	public btnLabel: Date = new Date();
	public months: Array<Date> = [];
	ngOnChanges(changes: SimpleChanges): void {
		this.months = [];
		for (
			let i = changes.choisenMonth?.currentValue;
			i < changes.choisenMonth?.currentValue + 6;
			i++
		) {
			let date = new Date();
			this.months.push(new Date(date.setMonth(i, 1)));
		}
	}
	onFilterClick(month: Date): void {
		this.btnLabel = month;
		this.isOpen = false;
		this.monthChoisen.emit(month.getMonth());
	}
	trackByFn(index: number, item: Date): Date {
		return item;
	}
}
