import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WizardServiceChoiceStepComponent } from '@components/ui/wizard/wizard-service-choice-step/wizard-service-choice-step.component';
import { MockService } from '@tests/mockData/mockService';
import { createMouseEvent } from '@tests/mockData/mockInputEvent';
import { ServiceListComponent } from '@components/ui/service-list/service-list.component';
import { MatCard } from '@angular/material/card';
import { AutoscrollDirective } from '@directives/autoscroll.directive';
import { FirstLetterUppercasePipe } from '@pipes/first-letter-uppercase.pipe';
import Spy = jasmine.Spy;

describe('WizardServiceChoiceStepComponent', () => {
	let fixture: ComponentFixture<WizardServiceChoiceStepComponent>;
	let component: WizardServiceChoiceStepComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [
				WizardServiceChoiceStepComponent,
				ServiceListComponent,
				MatCard,
				AutoscrollDirective,
				FirstLetterUppercasePipe,
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WizardServiceChoiceStepComponent);
		component = fixture.componentInstance;
		component.services = [];
		component.selectedService = null;
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('component should created', () => {
		expect(component).toBeDefined();
	});
	it('123', () => {
		expect(component);
	});

	describe('onServiceChange', () => {
		let serviceClickSpy: Spy;

		beforeEach(() => {
			serviceClickSpy = spyOn(component.serviceChange, 'emit');
		});

		it('should call serviceClick when onServiceChange called', () => {
			component.onServiceChange({ ...MockService });
			expect(serviceClickSpy).toHaveBeenCalledOnceWith({ ...MockService });
		});

		it('should not call serviceClick when onServiceChange called', () => {
			component.onServiceChange(undefined);
			expect(serviceClickSpy).not.toHaveBeenCalled();
		});
	});

	describe('onInputChange', () => {
		let inputChangeSpy: Spy;

		beforeEach(() => {
			inputChangeSpy = spyOn(component.inputChange, 'emit');
		});

		it('should call inputChangeSpy with value when onInputChange called', () => {
			component.onInputChange(createMouseEvent('mock'));
			expect(inputChangeSpy).toHaveBeenCalledOnceWith('mock');
		});
	});
});
