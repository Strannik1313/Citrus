import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleComponent } from '@shared/schedule/schedule.component';
import { TimepickerComponent } from '@shared/schedule/timepicker/timepicker.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '@directives/directives.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { Schedule } from '@models/Schedule';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ScheduleComponent', () => {
	let fixture: ComponentFixture<ScheduleComponent>;
	let component: ScheduleComponent;
	let matCard: DebugElement;
	let paragraphMasterName: DebugElement;
	let paragraphCost: DebugElement;
	let paragraphDuration: DebugElement;
	let timepicker: DebugElement;

	let mockTime = new Date(2000, 0, 0).toString();
	let mockFreeTimes: string[] = [mockTime];
	let mockSchedule: Schedule = {
		masterName: 'mockName',
		cost: 90,
		duration: 90,
		freeTimesWithShifts: [],
		masterId: '1',
		id: 'mockId',
		date: mockTime,
		freetimes: mockFreeTimes,
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ScheduleComponent, TimepickerComponent],
			imports: [CommonModule, MatCardModule, DirectivesModule, MatSelectModule, MatButtonModule, OverlayModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ScheduleComponent);
		component = fixture.componentInstance;
		component.schedules = [mockSchedule];
		component.selectedSchedule = mockSchedule;
		component.selectedTime = mockTime;
		fixture.detectChanges();
		matCard = fixture.debugElement.query(By.css('[data-testid="schedule_mat_card"]'));
		paragraphMasterName = fixture.debugElement.query(By.css('[data-testid="schedule_p_master_name"]'));
		paragraphCost = fixture.debugElement.query(By.css('[data-testid="schedule_p_cost"]'));
		paragraphDuration = fixture.debugElement.query(By.css('[data-testid="schedule_p_duration"]'));
		timepicker = fixture.debugElement.query(By.css('[data-testid="schedule_timepicker"]'));
	});

	afterEach(() => {
		fixture.destroy();
	});

	describe('ScheduleComponent', () => {
		it('ScheduleComponent exist', () => {
			expect(component).toBeTruthy();
		});

		describe('ScheduleComponent methods', () => {
			it('onTimeChange emit schedule with preorder', () => {
				let spy = spyOn(component.onTimeChange, 'emit');
				component.timeChange(mockTime, mockSchedule);
				expect(spy).toHaveBeenCalledOnceWith({ ...mockSchedule, preOrder: mockTime });
			});

			it('trackByFn return id', () => {
				expect(component.trackByFn(0, mockSchedule)).toBe(mockSchedule.id);
			});
		});

		describe('ScheduleComponent template', () => {
			it('ngIf render matcard, if it takes schedule with freetimes', () => {
				expect(matCard).toBeTruthy();
			});

			it('mat-card has all classes', () => {
				let classes = {
					schedule: true,
					active: true,
				};
				expect(matCard.classes).toEqual(jasmine.objectContaining(classes));
			});

			it('p with master name has right template', () => {
				expect(paragraphMasterName.nativeElement.textContent).toBe(mockSchedule.masterName);
			});

			it('p with cost has right template', () => {
				expect(paragraphCost.nativeElement.textContent).toBe('Цена: ' + mockSchedule.cost + ' рублей');
			});

			it('p with duration has right template', () => {
				expect(paragraphDuration.nativeElement.textContent).toBe('Продолжительность: ' + mockSchedule.cost + ' минут');
			});

			it('timepicker onTimeSelected event calls timeChange() with time and schedule', () => {
				let spy = spyOn(component, 'timeChange');
				timepicker.triggerEventHandler('onTimeSelected', mockTime);
				expect(spy).toHaveBeenCalledOnceWith(mockTime, mockSchedule);
			});
		});
	});
});
