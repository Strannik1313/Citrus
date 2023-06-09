import { SpinnerDirective } from '@components/ui/spinner/directive/spinner.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeDetectorRef, Component, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Spy = jasmine.Spy;
import { getMockSimpleChanges } from '@tests/mockSimpleChanges';
import { MockElementHeight } from '@tests/mockData/mockConstants';
import { By } from '@angular/platform-browser';

@Component({
	template: ` <div id="testComponent" appSpinner style="height: ${MockElementHeight}px"></div>`,
})
class TestComponent {}

describe('SpinnerDirective', () => {
	let viewContainerRef: ViewContainerRef;
	let cdr: ChangeDetectorRef;
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let directive: SpinnerDirective;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SpinnerDirective, TestComponent],
			imports: [MatProgressSpinnerModule, CommonModule],
			providers: [ViewContainerRef, ChangeDetectorRef],
		}).compileComponents();
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
		cdr = fixture.debugElement.injector.get(ChangeDetectorRef);
		directive = new SpinnerDirective(viewContainerRef, cdr);
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	describe('ngOnChanges', () => {
		it('should call renderSpinnerInHost', () => {
			let directiveSpy: Spy = spyOn(directive, 'renderSpinnerInHost');
			directive.ngOnChanges(getMockSimpleChanges({ isRunning: true }));
			expect(directiveSpy).toHaveBeenCalled();
		});

		it('should call removeSpinnerFromHost', () => {
			let directiveSpy: Spy = spyOn(directive, 'removeSpinnerFromHost');
			directive.ngOnChanges(getMockSimpleChanges({ isRunning: false }));
			expect(directiveSpy).toHaveBeenCalled();
		});
	});

	describe('renderSpinnerInHost', () => {
		it('should set spinner diameter', () => {
			spyOn(directive, 'calculateSpinnerSize').and.returnValue(MockElementHeight);
			directive.renderSpinnerInHost();
			expect(directive.spinner).toBeTruthy();
			expect(directive.spinner?.instance.diameter).toEqual(MockElementHeight);
		});

		it('calculateSpinnerSize should return 100', () => {
			let el = viewContainerRef.element.nativeElement;
			el.style.height = 0;
			directive.calculateSpinnerSize(viewContainerRef.element);
			expect(directive.calculateSpinnerSize(viewContainerRef.element)).toEqual(100);
		});

		it('calculateSpinnerSize should return 30', () => {
			let el = fixture.debugElement.query(By.directive(SpinnerDirective))?.nativeElement;
			el.style.height = '10px';
			expect(directive.calculateSpinnerSize(viewContainerRef.element)).toEqual(30);
		});

		it('calculateSpinnerSize should return element height', () => {
			let el = fixture.debugElement.query(By.directive(SpinnerDirective))?.nativeElement;
			el.style.height = '100px';
			expect(directive.calculateSpinnerSize(viewContainerRef.element)).toEqual(100);
		});
	});
});
