import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardComponent } from '@components/ui/wizard/wizard.component';
import { CommonModule } from '@angular/common';
import { StepperModule } from '@shared/stepper/stepper.module';
import { MatButtonModule } from '@angular/material/button';
import { WizardServiceChoiceStepComponent } from '@components/ui/wizard/wizard-service-choice-step/wizard-service-choice-step.component';
import { WizardDateChoiceStepComponent } from '@components/ui/wizard/wizard-date-choice-step/wizard-date-choice-step.component';
import { WizardConfirmStepComponent } from '@components/ui/wizard/wizard-confirm-step/wizard-confirm-step.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FilterDropdownModule } from '@shared/filter-dropdown/filter-dropdown.module';
import {
	decrementWizardStep,
	getNextWeek,
	getPrevWeek,
	getServices,
	incrementWizardStep,
	setOrder,
	setSelectedDay,
	setSelectedMaster,
	setSelectedMonth,
	setSelectedSchedule,
	setSelectedService,
} from '@state-management/wizard-feature/wizard.actions';
import {
	MockCalendarDtos,
	MockConfirmForm,
	MockDate,
	MockInitialState,
	MockLoadingState,
	MockMasterDto,
	MockSchedule,
	MockSelectors,
	MockService,
	MockServiceDto,
	MockStep,
} from '@tests/mockData/mockConstants';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ServiceListComponent } from '@components/ui/service-list/service-list.component';
import { DirectivesModule } from '@directives/directives.module';
import { SpinnerModule } from '@components/ui/spinner/spinner.module';
import { FirstLetterUppercasePipe } from '@pipes/first-letter-uppercase.pipe';
import { AcceptPageComponent } from '@components/ui/wizard/accept-page/accept-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalendarModule } from '@shared/calendar/calendar.module';
import { AutocompleteModule } from '@shared/autocomplete/autocomplete.module';
import { ScheduleModule } from '@shared/schedule/schedule.module';
import { MonthFilterModule } from '@shared/month-filter/month-filter.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { BUTTON_LABELS } from '@enums/labels/ButtonLabels';

describe('WizardComponent', () => {
	let fixture: ComponentFixture<WizardComponent>;
	let component: WizardComponent;
	let store: MockStore;
	let prevBtn: DebugElement;
	let nextBtn: DebugElement;
	let wizardFirstStep: DebugElement;
	let wizardSecondStep: DebugElement;
	let wizardThirdStep: DebugElement;
	let cdr: ChangeDetectorRef;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				WizardComponent,
				WizardServiceChoiceStepComponent,
				WizardDateChoiceStepComponent,
				WizardConfirmStepComponent,
				FirstLetterUppercasePipe,
				ServiceListComponent,
				AcceptPageComponent,
			],
			imports: [
				CommonModule,
				MatButtonModule,
				MatCardModule,
				MatListModule,
				MatInputModule,
				MatFormFieldModule,
				StepperModule,
				CalendarModule,
				AutocompleteModule,
				ScheduleModule,
				MonthFilterModule,
				DirectivesModule,
				ReactiveFormsModule,
				SpinnerModule,
				FormsModule,
				FilterDropdownModule,
				BrowserAnimationsModule,
				NgxMaskModule.forRoot(),
			],
			providers: [provideMockStore({ initialState: MockInitialState, selectors: MockSelectors }), ChangeDetectorRef],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WizardComponent);
		component = fixture.componentInstance;
		store = fixture.componentRef.injector.get(MockStore);
		cdr = fixture.componentRef.injector.get(ChangeDetectorRef);
		fixture.detectChanges();
		prevBtn = fixture.debugElement.query(By.css('[data-testid="wizard_prev_step_btn"]'));
		nextBtn = fixture.debugElement.query(By.css('[data-testid="wizard_next_step_btn"]'));
	});

	afterEach(() => {
		store?.resetSelectors();
		fixture.destroy();
	});

	describe('WizardComponent', () => {
		it('wizard component exist', () => {
			expect(component).toBeTruthy();
		});

		it('ngOnInit', () => {
			component.componentsLoadingState$.subscribe(value => {
				expect(value).toEqual(MockLoadingState);
			});

			component.currentStep$.subscribe(value => {
				expect(value).toBe(MockStep);
			});

			component.services$.subscribe(value => {
				expect(value).toEqual([MockService]);
			});

			component.fwdBtnDisabled$.subscribe(value => {
				expect(value).toBeTrue();
			});

			component.selectedService$.subscribe(value => {
				expect(value).toEqual(MockService);
			});

			component.masters$.subscribe(value => {
				expect(value).toEqual([MockMasterDto]);
			});

			component.dates$.subscribe(value => {
				expect(value).toEqual(MockCalendarDtos);
			});

			component.schedules$.subscribe(value => {
				expect(value).toEqual([MockSchedule]);
			});

			component.months$.subscribe(value => {
				expect(value).toEqual([MockDate]);
			});

			component.selectedMonth$.subscribe(value => {
				expect(value).toEqual(MockDate);
			});

			component.prevWeekBtnDisabled$.subscribe(value => {
				expect(value).toBeTrue();
			});

			component.selectedSchedule$.subscribe(value => {
				expect(value).toEqual(MockSchedule);
			});

			component.selectedScheduleTime$.subscribe(value => {
				expect(value).toEqual(MockDate);
			});

			component.selectedMaster$.subscribe(value => {
				expect(value).toEqual(MockMasterDto);
			});

			component.selectedDay$.subscribe(value => {
				expect(value).toEqual(MockDate);
			});

			component.isFwdBtnVisible$.subscribe(value => {
				expect(value).toBeTrue();
			});
		});

		it('onServiceChange', () => {
			let spy = spyOn(store, 'dispatch');
			component.onServiceChange(MockServiceDto);
			expect(spy).toHaveBeenCalledOnceWith(setSelectedService({ payload: MockServiceDto }));
		});

		it('timeChange', () => {
			let spy = spyOn(store, 'dispatch');
			component.timeChange(MockSchedule);
			expect(spy).toHaveBeenCalledOnceWith(setSelectedSchedule({ payload: MockSchedule }));
		});

		describe('onWeekChange', () => {
			it('prev week click event', () => {
				let spy = spyOn(store, 'dispatch');
				component.onWeekChange(CalendarChangeWeekEnum.DECREASE);
				expect(spy).toHaveBeenCalledOnceWith(getPrevWeek());
			});

			it('next week click event', () => {
				let spy = spyOn(store, 'dispatch');
				component.onWeekChange(CalendarChangeWeekEnum.INCREASE);
				expect(spy).toHaveBeenCalledOnceWith(getNextWeek());
			});
		});

		it('onMasterChange', () => {
			let spy = spyOn(store, 'dispatch');
			component.onMasterChange(MockMasterDto);
			expect(spy).toHaveBeenCalledOnceWith(setSelectedMaster({ payload: MockMasterDto }));
		});

		it('onDayChange', () => {
			let spy = spyOn(store, 'dispatch');
			component.onDayChange(MockDate);
			expect(spy).toHaveBeenCalledOnceWith(setSelectedDay({ payload: MockDate }));
		});

		it('onMonthChange', () => {
			let spy = spyOn(store, 'dispatch');
			component.onMonthChange(MockDate);
			expect(spy).toHaveBeenCalledOnceWith(setSelectedMonth({ payload: MockDate }));
		});

		describe('onBtnClick', () => {
			it('prev step button click event', () => {
				let spy = spyOn(store, 'dispatch');
				component.onBtnClick(false);
				expect(spy).toHaveBeenCalledOnceWith(decrementWizardStep());
			});

			it('next step button click event', () => {
				let spy = spyOn(store, 'dispatch');
				component.onBtnClick(true);
				expect(spy).toHaveBeenCalledOnceWith(incrementWizardStep());
			});
		});

		it('onServiceStepInputChange', () => {
			let spy = spyOn(store, 'dispatch');
			component.onServiceStepInputChange('mockService');
			expect(spy).toHaveBeenCalledOnceWith(getServices({ payload: 'mockService' }));
		});

		it('onFormSubmit', () => {
			let spy = spyOn(store, 'dispatch');
			component.onFormSubmit(MockConfirmForm);
			expect(spy).toHaveBeenCalledOnceWith(setOrder({ payload: MockConfirmForm }));
		});
	});

	describe('template', () => {
		it('prev button contains all attributes', () => {
			let attributes = {
				'mat-button': '',
				color: 'primary',
			};
			expect(prevBtn.attributes).toEqual(jasmine.objectContaining(attributes));
		});

		it('next button contains all attributes', () => {
			let attributes = {
				'mat-button': '',
				color: 'primary',
			};
			expect(nextBtn.attributes).toEqual(jasmine.objectContaining(attributes));
		});

		it('prev button has right label', () => {
			expect(prevBtn.nativeElement.textContent).toBe(BUTTON_LABELS.PREV_BTN_LABEL);
		});

		it('next button has right label', () => {
			expect(nextBtn.nativeElement.textContent).toBe(BUTTON_LABELS.NEXT_BTN_LABEL);
		});

		it('prev button click calls onBtnClick() with false', () => {
			let spy = spyOn(component, 'onBtnClick');
			prevBtn.triggerEventHandler('click', undefined);
			expect(spy).toHaveBeenCalledOnceWith(false);
		});

		it('next button click calls onBtnClick() with true', () => {
			let spy = spyOn(component, 'onBtnClick');
			nextBtn.triggerEventHandler('click', undefined);
			expect(spy).toHaveBeenCalledOnceWith(true);
		});

		it('next button is visible', () => {
			expect(nextBtn).toBeTruthy();
			component.isFwdBtnVisible$ = of(false);
			cdr.detectChanges();
			nextBtn = fixture.debugElement.query(By.css('[data-testid="wizard_next_step_btn"]'));
			expect(nextBtn).toBeFalsy();
		});

		it('next button is disabled', () => {
			let attributes = {
				disabled: 'true',
			};
			expect(nextBtn.attributes).toEqual(jasmine.objectContaining(attributes));
			component.fwdBtnDisabled$ = of(true);
			cdr.detectChanges();
			nextBtn = fixture.debugElement.query(By.css('[data-testid="wizard_next_step_btn"]'));
			expect(nextBtn.attributes).toEqual(jasmine.objectContaining(attributes));
		});

		describe('ngSwitch', () => {
			describe('first step', () => {
				beforeEach(() => {
					component.currentStep$ = of(1);
					cdr.detectChanges();
					wizardFirstStep = fixture.debugElement.query(By.css('[data-testid="wizard_first_step"]'));
				});

				it('render first step', () => {
					expect(wizardFirstStep).toBeTruthy();
				});

				it('serviceChange calls onServiceChange', () => {
					let spy = spyOn(component, 'onServiceChange');
					wizardFirstStep.triggerEventHandler('serviceChange', MockService);
					expect(spy).toHaveBeenCalledOnceWith(MockService);
				});

				it('inputChange calls onServiceStepInputChange', () => {
					let spy = spyOn(component, 'onServiceStepInputChange');
					wizardFirstStep.triggerEventHandler('inputChange', 'mock');
					expect(spy).toHaveBeenCalledOnceWith('mock');
				});
			});

			describe('second step', () => {
				beforeEach(() => {
					component.currentStep$ = of(2);
					cdr.detectChanges();
					wizardSecondStep = fixture.debugElement.query(By.css('[data-testid="wizard_second_step"]'));
				});

				it('render second step', () => {
					expect(wizardSecondStep).toBeTruthy();
				});

				it('onWeekChange calls onWeekChange', () => {
					let spy = spyOn(component, 'onWeekChange');
					wizardSecondStep.triggerEventHandler('onWeekChange', CalendarChangeWeekEnum.INCREASE);
					expect(spy).toHaveBeenCalledOnceWith(CalendarChangeWeekEnum.INCREASE);
				});

				it('onMasterChange calls onMasterChange', () => {
					let spy = spyOn(component, 'onMasterChange');
					wizardSecondStep.triggerEventHandler('onMasterChange', MockMasterDto);
					expect(spy).toHaveBeenCalledOnceWith(MockMasterDto);
				});

				it('onDayChange calls onDayChange', () => {
					let spy = spyOn(component, 'onDayChange');
					wizardSecondStep.triggerEventHandler('onDayChange', MockDate);
					expect(spy).toHaveBeenCalledOnceWith(MockDate);
				});

				it('onMonthChange calls onMonthChange', () => {
					let spy = spyOn(component, 'onMonthChange');
					wizardSecondStep.triggerEventHandler('onMonthChange', MockDate);
					expect(spy).toHaveBeenCalledOnceWith(MockDate);
				});

				it('onTimeChange calls timeChange', () => {
					let spy = spyOn(component, 'timeChange');
					wizardSecondStep.triggerEventHandler('onTimeChange', MockSchedule);
					expect(spy).toHaveBeenCalledOnceWith(MockSchedule);
				});
			});

			describe('third step', () => {
				beforeEach(() => {
					component.currentStep$ = of(3);
					cdr.detectChanges();
					wizardThirdStep = fixture.debugElement.query(By.css('[data-testid="wizard_third_step"]'));
				});

				it('ngSwitch render third step', () => {
					expect(wizardThirdStep).toBeTruthy();
				});

				it('onFormSubmit calls onFormSubmit', () => {
					let spy = spyOn(component, 'onFormSubmit');
					wizardThirdStep.triggerEventHandler('onFormSubmit', MockConfirmForm);
					expect(spy).toHaveBeenCalledOnceWith(MockConfirmForm);
				});
			});
		});
	});
});
