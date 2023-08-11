import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardDateChoiceStepComponent } from '@components/ui/wizard/wizard-date-choice-step/wizard-date-choice-step.component';
import { CommonModule } from '@angular/common';
import { CalendarModule } from '@shared/calendar/calendar.module';
import { ScheduleModule } from '@shared/schedule/schedule.module';
import { MonthFilterModule } from '@shared/month-filter/month-filter.module';
import { SpinnerModule } from '@components/ui/spinner/spinner.module';
import { FilterDropdownModule } from '@shared/filter-dropdown/filter-dropdown.module';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';
import { MockDate, MockLoadingState, MockMasterDto, MockSchedule } from '@tests/mock-constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WizardDateChoiceStepComponent', () => {
	let fixture: ComponentFixture<WizardDateChoiceStepComponent>;
	let component: WizardDateChoiceStepComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				CommonModule,
				CalendarModule,
				ScheduleModule,
				MonthFilterModule,
				SpinnerModule,
				FilterDropdownModule,
				BrowserAnimationsModule,
			],
			declarations: [WizardDateChoiceStepComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WizardDateChoiceStepComponent);
		component = fixture.componentInstance;
		component.loadingState = MockLoadingState.wizardSecondStep;
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
			component.onDaySelected(MockDate);
			expect(spy).toHaveBeenCalledOnceWith(MockDate);
		});

		it('weekChange emit onWeekChange', () => {
			let spy = spyOn(component.onWeekChange, 'emit');
			component.weekChange(CalendarChangeWeekEnum.INCREASE);
			expect(spy).toHaveBeenCalledOnceWith(CalendarChangeWeekEnum.INCREASE);
		});

		it('onMasterFilterChange emit onMasterChange', () => {
			let spy = spyOn(component.onMasterChange, 'emit');
			component.onMasterFilterChange(MockMasterDto);
			expect(spy).toHaveBeenCalledOnceWith(MockMasterDto);
		});

		it('onMonthFilterChange emit onMonthChange', () => {
			let spy = spyOn(component.onMonthChange, 'emit');
			component.onMonthFilterChange(MockDate);
			expect(spy).toHaveBeenCalledOnceWith(MockDate);
		});

		it('timeChange emit onTimeChange', () => {
			let spy = spyOn(component.onTimeChange, 'emit');
			component.timeChange(MockSchedule);
			expect(spy).toHaveBeenCalledOnceWith(MockSchedule);
		});
	});
});
