import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardDateChoiceStepComponent } from '@components/ui/wizard/wizard-date-choice-step/wizard-date-choice-step.component';
import { CommonModule } from '@angular/common';
import { CalendarModule } from '@shared/calendar/calendar.module';
import { ScheduleModule } from '@shared/schedule/schedule.module';
import { MonthFilterModule } from '@shared/month-filter/month-filter.module';
import { SpinnerModule } from '@components/ui/spinner/spinner.module';
import { FilterDropdownModule } from '@shared/filter-dropdown/filter-dropdown.module';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';
import { MasterDto } from '@models/MasterDto';
import { Schedule } from '@models/Schedule';

describe('WizardDateChoiceStepComponent', () => {
	let fixture: ComponentFixture<WizardDateChoiceStepComponent>;
	let component: WizardDateChoiceStepComponent;

	let mockDate = new Date(2000, 0, 0).toString();
	let mockMaster: MasterDto = {
		name: 'mockName',
		id: 'mockId',
		prices: [90],
		servicesId: ['mockServiceId'],
	};
	let mockSchedule: Schedule = {
		masterName: 'mockName',
		cost: 90,
		duration: 90,
		freeTimesWithShifts: [],
		masterId: '1',
		id: 'mockId',
		date: mockDate,
		freetimes: [mockDate],
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CommonModule, CalendarModule, ScheduleModule, MonthFilterModule, SpinnerModule, FilterDropdownModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WizardDateChoiceStepComponent);
		component = fixture.componentInstance;
		component.loadingState = {
			isLoadingMasterFilter: true,
			isLoadingCalendar: true,
			isLoadingMonthsFilter: true,
			isLoadingSchedules: true,
		};
		fixture.detectChanges();
	});

	afterEach(() => {
		fixture.destroy();
	});

	describe('WizardDateChoiceStepComponent', () => {
		it('WizardDateChoiceStepComponent exist', () => {
			expect(component).toBeTruthy();
		});

		it('onDaySelected emit onDayChange', () => {
			let spy = spyOn(component.onDayChange, 'emit');
			component.onDaySelected(mockDate);
			expect(spy).toHaveBeenCalledOnceWith(mockDate);
		});

		it('weekChange emit onWeekChange', () => {
			let spy = spyOn(component.onWeekChange, 'emit');
			component.weekChange(CalendarChangeWeekEnum.INCREASE);
			expect(spy).toHaveBeenCalledOnceWith(CalendarChangeWeekEnum.INCREASE);
		});

		it('onMasterFilterChange emit onMasterChange', () => {
			let spy = spyOn(component.onMasterChange, 'emit');
			component.onMasterFilterChange(mockMaster);
			expect(spy).toHaveBeenCalledOnceWith(mockMaster);
		});

		it('onMonthFilterChange emit onMonthChange', () => {
			let spy = spyOn(component.onMonthChange, 'emit');
			component.onMonthFilterChange(mockDate);
			expect(spy).toHaveBeenCalledOnceWith(mockDate);
		});

		it('timeChange emit onTimeChange', () => {
			let spy = spyOn(component.onTimeChange, 'emit');
			component.timeChange(mockSchedule);
			expect(spy).toHaveBeenCalledOnceWith(mockSchedule);
		});
	});
});
