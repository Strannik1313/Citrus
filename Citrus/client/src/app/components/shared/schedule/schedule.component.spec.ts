import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleComponent } from '@shared/schedule/schedule.component';
import { TimepickerComponent } from '@shared/schedule/timepicker/timepicker.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '@directives/directives.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockDate, MockSchedule } from '@tests/mockData/mockConstants';

describe('ScheduleComponent', () => {
	let fixture: ComponentFixture<ScheduleComponent>;
	let component: ScheduleComponent;
	let matCard: DebugElement;
	let paragraphMasterName: DebugElement;
	let paragraphCost: DebugElement;
	let paragraphDuration: DebugElement;
	let timepicker: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ScheduleComponent, TimepickerComponent],
			imports: [CommonModule, MatCardModule, DirectivesModule, MatSelectModule, MatButtonModule, OverlayModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ScheduleComponent);
		component = fixture.componentInstance;
		component.schedules = [MockSchedule];
		component.selectedSchedule = MockSchedule;
		component.selectedTime = MockDate;
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
				component.timeChange(MockDate, MockSchedule);
				expect(spy).toHaveBeenCalledOnceWith({ ...MockSchedule, preOrder: MockDate });
			});

			it('trackByFn return id', () => {
				expect(component.trackByFn(0, MockSchedule)).toBe(MockSchedule.id);
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
				expect(paragraphMasterName.nativeElement.textContent).toBe(MockSchedule.masterName);
			});

			it('p with cost has right template', () => {
				expect(paragraphCost.nativeElement.textContent).toBe('Цена: ' + MockSchedule.cost + ' рублей');
			});

			it('p with duration has right template', () => {
				expect(paragraphDuration.nativeElement.textContent).toBe('Продолжительность: ' + MockSchedule.cost + ' минут');
			});

			it('timepicker onTimeSelected event calls timeChange() with time and schedule', () => {
				let spy = spyOn(component, 'timeChange');
				timepicker.triggerEventHandler('onTimeSelected', MockDate);
				expect(spy).toHaveBeenCalledOnceWith(MockDate, MockSchedule);
			});
		});
	});
});
