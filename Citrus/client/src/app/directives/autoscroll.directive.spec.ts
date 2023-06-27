import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AutoscrollDirective } from '@directives/autoscroll.directive';

@Component({
	template: ` <li appAutoscroll id="0">MockLi1</li>`,
})
export class TestComponent {}

describe('AutoscrollDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let li: DebugElement;
	let des: DebugElement;
	let dir: AutoscrollDirective;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [TestComponent, AutoscrollDirective],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		li = fixture.debugElement.query(By.css('li'));
		des = fixture.debugElement.query(By.directive(AutoscrollDirective));
		dir = des.injector.get(AutoscrollDirective) as AutoscrollDirective;
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('component should created', () => {
		expect(component).toBeDefined();
	});

	describe('ngAfterViewInit', () => {
		it('scrollIntoView should not be called', () => {
			spyOn(li.nativeElement, 'scrollIntoView').and.callThrough();
			dir.isSelected = false;
			expect(li.nativeElement.scrollIntoView).not.toHaveBeenCalled();
		});

		it('scrollIntoView should be called', () => {
			spyOn(li.nativeElement, 'scrollIntoView').and.callThrough();
			dir.isSelected = true;
			expect(li.nativeElement.scrollIntoView).toHaveBeenCalled();
		});
	});
});
