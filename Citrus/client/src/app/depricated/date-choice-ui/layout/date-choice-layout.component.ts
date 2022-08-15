// import {
// 	ChangeDetectionStrategy,
// 	Component,
// 	EventEmitter,
// 	Input,
// 	OnInit,
// 	Output,
// } from '@angular/core';
// import { CustomCalendarHeader } from '@components/custom-components-material-ui/custom-calendar-header/custom-calendar-header.component';
// import { ChoisenTime } from '@interfaces/choisen-time';
// import { StudioData } from '@interfaces/studio-data';
// import { ClientData } from '@models/client-data';

// @Component({
// 	selector: 'app-date-choice-layout',
// 	templateUrl: './date-choice-layout.component.html',
// 	styleUrls: ['./date-choice-layout.component.scss'],
// 	changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class DateChoiceLayoutComponent implements OnInit {
// 	@Input() customHeader = CustomCalendarHeader;
// 	@Input() startDisabledDate: Date = new Date();
// 	@Input() endDisabledDates: Date = new Date();
// 	@Input() showCard: boolean = false;
// 	@Input() selected: Date | null = null;
// 	@Input() selectedTime: number = 0;
// 	@Input() selectedCard: number = 0;
// 	@Input() clientData: ClientData = new ClientData();
// 	@Input() studioData: StudioData[] = [];
// 	@Output() dateWasSelected: EventEmitter<Date> = new EventEmitter();
// 	@Output() timeWasSelected: EventEmitter<ChoisenTime> = new EventEmitter();
// 	public masterImageUrl: string = '';
// 	ngOnInit(): void {
// 		if (this.showCard) {
// 			this.selected !== null ? this.dateWasSelected.emit(this.selected) : null;
// 		}
// 	}

// 	dateSelected(e: Date): void {
// 		this.dateWasSelected.emit(e);
// 	}

// 	timeIsChoisen(time: number, masterId: number, masterName: string): void {
// 		this.timeWasSelected.emit({
// 			time,
// 			masterId,
// 			masterName,
// 		});
// 	}

// 	trackByFn(index: number, item: number): number {
// 		return index;
// 	}
// }
