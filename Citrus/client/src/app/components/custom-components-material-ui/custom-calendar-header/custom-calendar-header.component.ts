import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Inject,
	OnDestroy,
} from '@angular/core';
import {
	DateAdapter,
	MatDateFormats,
	MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'custom-calendar-header',
	styleUrls: ['./custom-calendar-header.component.scss'],
	templateUrl: './custom-calendar-header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCalendarHeader<D> implements OnDestroy {
	private _destroyed = new Subject<void>();

	constructor(
		private _calendar: MatCalendar<D>,
		private _dateAdapter: DateAdapter<D>,
		@Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
		cdr: ChangeDetectorRef,
	) {
		_calendar.stateChanges
			.pipe(takeUntil(this._destroyed))
			.subscribe(() => cdr.markForCheck());
	}

	ngOnDestroy() {
		this._destroyed.next();
		this._destroyed.complete();
	}

	get periodLabel() {
		return this._dateAdapter
			.format(
				this._calendar.activeDate,
				this._dateFormats.display.monthYearLabel,
			)
			.toLocaleUpperCase();
	}

	previousClicked() {
		this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
			this._calendar.activeDate,
			-1,
		);
	}

	nextClicked() {
		this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
			this._calendar.activeDate,
			1,
		);
	}
}
