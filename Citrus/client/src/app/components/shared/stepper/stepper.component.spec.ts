import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepperComponent } from '@shared/stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
	let fixture: ComponentFixture<StepperComponent>;
	let component: StepperComponent;
	let step: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [StepperComponent],
			imports: [CommonModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(StepperComponent);
		component = fixture.componentInstance;
		component.currentStep = 1;
		component.stepsQuantity = [1, 2, 3];
		fixture.detectChanges();
		step = fixture.debugElement.queryAll(By.css('[data-testid="step_container"]'))[0];
	});
	afterEach(() => {
		fixture.destroy();
	});

	describe('StepperComponent', () => {
		it('second step has right classes', () => {
			let classes = {
				step: true,
				'active-step': true,
			};
			expect(step.classes).toEqual(jasmine.objectContaining(classes));
		});

		it('span has right text', () => {
			expect(step.children[0].nativeElement.textContent).toBe('1');
		});
	});
});
