import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimepickerComponent } from '@shared/schedule/timepicker/timepicker.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

describe('TimepickerComponent', () => {
	let fixture: ComponentFixture<TimepickerComponent>;
	let component: TimepickerComponent;
	let btns: DebugElement[];
	let list: DebugElement;
	let option: DebugElement;
	let cdr: ChangeDetectorRef;
	let datePipe: DatePipe;

	let mockSelectedTime = new Date(2000, 0, 1, 0).toString();
	let mockSecondTime = new Date(2000, 0, 1, 1).toString();
	let mockThirdTime = new Date(2000, 0, 1, 2).toString();
	let mockTime: Array<string[]> = [[mockSelectedTime, mockSecondTime], [mockThirdTime]];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TimepickerComponent],
			imports: [OverlayModule, MatButtonModule],
			providers: [ChangeDetectorRef, DatePipe],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TimepickerComponent);
		component = fixture.componentInstance;
		component.time = mockTime;
		component.selectedTime = mockSelectedTime;
		fixture.detectChanges();
		cdr = fixture.componentRef.injector.get(ChangeDetectorRef);
		datePipe = fixture.componentRef.injector.get(DatePipe);
		btns = fixture.debugElement.queryAll(By.css('[data-testid="timepicker_button"]'));
	});

	afterEach(() => {
		fixture.destroy();
	});

	describe('TimepickerComponent', () => {
		describe('timeSelected', () => {
			it('timeSelected emit selected time', () => {
				let spy = spyOn(component.onTimeSelected, 'emit');
				component.timeSelected(mockSelectedTime);
				expect(spy).toHaveBeenCalledOnceWith(mockSelectedTime);
			});

			it('timeSelected() set openedPanelNumber to null', () => {
				component.timeSelected(mockSelectedTime);
				expect(component.openedPanelNumber).toBe(null);
			});

			it('onBackdropClick() set openedPanelNumber to null', () => {
				component.onBackdropClick();
				expect(component.openedPanelNumber).toBe(null);
			});

			it('timeBtnClick set openedPanelNumber to passed index', () => {
				component.timeBtnClick(1);
				expect(component.openedPanelNumber).toBe(1);
			});
		});

		describe('template', () => {
			it('first button has all classes', () => {
				let checkedClasses = { active: true };
				expect(btns[0].classes).toEqual(jasmine.objectContaining(checkedClasses));
			});

			it('first button has all attributes', () => {
				let checkedAttributes = { color: 'primary', cdkOverlayOrigin: '', 'mat-stroked-button': '' };
				expect(btns[0].attributes).toEqual(jasmine.objectContaining(checkedAttributes));
			});

			it('first button click calls timeBtnClick with 0 index', () => {
				let spy = spyOn(component, 'timeBtnClick');
				btns[0].triggerEventHandler('click', undefined);
				expect(spy).toHaveBeenCalledOnceWith(0);
			});

			describe('tests for list', () => {
				beforeEach(() => {
					btns[0].nativeElement.click();
					cdr.detectChanges();
					list = fixture.debugElement.query(By.css('[data-testid="timepicker_list"]'));
					option = fixture.debugElement.query(By.css('[data-testid="timepicker_option"]'));
				});

				it('ul have all classes', () => {
					let checkedAttributes = {
						time__select__dropdown: true,
					};
					expect(list.classes).toEqual(jasmine.objectContaining(checkedAttributes));
				});

				it('first li has all classes', () => {
					let checkedAttributes = {
						time__select__dropdown__option: true,
						selected: true,
					};
					expect(option.classes).toEqual(jasmine.objectContaining(checkedAttributes));
				});

				it('click on first li calls timeSelected() with timeOption', () => {
					let spy = spyOn(component, 'timeSelected');
					option.triggerEventHandler('click', undefined);
					expect(spy).toHaveBeenCalledOnceWith(mockSelectedTime);
				});

				it('li has right template', () => {
					expect(option.nativeElement.textContent).toBe(datePipe.transform(mockSelectedTime, 'h:mm'));
				});
			});
		});
	});
});
