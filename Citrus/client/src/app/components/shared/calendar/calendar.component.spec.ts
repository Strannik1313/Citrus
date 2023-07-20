import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule, By } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from '@shared/calendar/calendar.component';
import { CalendarChangeWeekEnum } from '@shared/calendar/enums/CalendarChangeWeekEnum';
import { CalendarDatesDto } from '@models/CalendarDatesDto';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { CALENDAR_BUTTON_LABELS } from '@shared/calendar/enums/CALENDAR_BUTTON_LABELS';
import { MockCalendarDtos, MockDate } from '@tests/mockData/mockConstants';

describe('CalendarComponent', () => {
	let component: CalendarComponent;
	let fixture: ComponentFixture<CalendarComponent>;
	let prevBtn: DebugElement;
	let nextBtn: DebugElement;
	let cells: DebugElement[];
	let paragraphs: DebugElement[];
	let cdr: ChangeDetectorRef;
	let datePipe: DatePipe;

	let mockDay: CalendarDatesDto = MockCalendarDtos[0];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CalendarComponent],
			imports: [CommonModule, MatIconModule, BrowserModule, BrowserAnimationsModule],
			providers: [DatePipe, ChangeDetectorRef],
		}).compileComponents();

		fixture = TestBed.createComponent(CalendarComponent);
		component = fixture.componentInstance;
		cdr = fixture.componentRef.injector.get(ChangeDetectorRef);
		datePipe = fixture.componentRef.injector.get(DatePipe);
		component.dates = MockCalendarDtos;
		component.preselectedDate = MockDate;
		fixture.detectChanges();
		prevBtn = fixture.debugElement.query(By.css('[data-testid="calendar_prev_btn"]'));
		nextBtn = fixture.debugElement.query(By.css('[data-testid="calendar_next_btn"]'));
		cells = fixture.debugElement.queryAll(By.css('.cell'));
		paragraphs = cells[0]?.queryAll(By.css('p'));
	});

	afterEach(() => {
		fixture.destroy();
	});

	describe('CalendarComponent', () => {
		it('should create', () => {
			expect(component).toBeTruthy();
		});
	});

	describe('onNextWeekClick', () => {
		it('call onWeekChange emit', () => {
			let spy = spyOn(component.onWeekChange, 'emit');
			component.onNextWeekClick();
			expect(spy).toHaveBeenCalledOnceWith(CalendarChangeWeekEnum.INCREASE);
		});
	});

	describe('onPrevWeekClick', () => {
		it('call onWeekChange emit', () => {
			let spy = spyOn(component.onWeekChange, 'emit');
			component.onPrevWeekClick();
			expect(spy).toHaveBeenCalledOnceWith(CalendarChangeWeekEnum.DECREASE);
		});
	});

	describe('onDateClick', () => {
		it('call onDayChange emit', () => {
			let spy = spyOn(component.onDayChange, 'emit');
			component.onDateClick(mockDay);
			expect(spy).toHaveBeenCalledOnceWith(mockDay.date);
		});
	});

	describe('trackByFn', () => {
		it('return date', () => {
			let date = component.trackByFn(0, mockDay);
			expect(date).toBe(mockDay.date);
		});
	});

	describe('template', () => {
		it('prev button is disabled', () => {
			component.prevWeekBtnDisabled = true;
			cdr.detectChanges();
			expect((prevBtn.nativeElement as HTMLButtonElement).disabled).toBeTrue();
		});

		it('next button is disabled', () => {
			component.nextWeekBtnDisabled = true;
			cdr.detectChanges();
			expect((nextBtn.nativeElement as HTMLButtonElement).disabled).toBeTrue();
		});

		it('render cells by ngFor', () => {
			expect(cells.length).toBe(2);
		});

		it('first cell is disabled', () => {
			expect(cells[0].classes?.disable).toBeTrue();
		});

		it('first cell is active', () => {
			expect(cells[0].classes?.active).toBeTrue();
		});

		describe('labels', () => {
			it('prev button label is right', () => {
				expect(prevBtn.nativeElement.textContent).toBe(CALENDAR_BUTTON_LABELS.PREV);
			});

			it('next button label is right', () => {
				expect(nextBtn.nativeElement.textContent).toBe(CALENDAR_BUTTON_LABELS.NEXT);
			});

			it('first p in cell contain name of day', () => {
				expect(paragraphs[0].nativeElement.textContent).toBe(datePipe.transform(MockDate, 'EEEEE'));
			});

			it('second p in cell contain day in number format', () => {
				expect(paragraphs[1].nativeElement.textContent).toBe(datePipe.transform(MockDate, 'dd.MM'));
			});
		});

		describe('clicks', () => {
			it('click on first cell calls onDateClick', () => {
				let spy = spyOn(component, 'onDateClick');
				cells[0].triggerEventHandler('click', undefined);
				expect(spy).toHaveBeenCalledOnceWith(MockCalendarDtos[0]);
			});

			it('click prev button calls onPrevWeekClick', () => {
				let spy = spyOn(component, 'onPrevWeekClick');
				prevBtn.triggerEventHandler('click', undefined);
				expect(spy).toHaveBeenCalledOnceWith();
			});

			it('click next button calls onNextWeekClick', () => {
				let spy = spyOn(component, 'onNextWeekClick');
				nextBtn.triggerEventHandler('click', undefined);
				expect(spy).toHaveBeenCalledOnceWith();
			});
		});
	});
});
