import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AddActiveClassDirective } from '@directives/add-active-class.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
	template: ` <li appAddActiveClass id="0">MockLi1</li>`,
})
export class TestComponent {}

describe('AddActiveClassDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;
	let li: DebugElement;
	let des: DebugElement;
	let dir: AddActiveClassDirective;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [TestComponent, AddActiveClassDirective],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		li = fixture.debugElement.query(By.css('li'));
		des = fixture.debugElement.query(By.directive(AddActiveClassDirective));
		dir = des.injector.get(AddActiveClassDirective) as AddActiveClassDirective;
	});

	afterEach(() => {
		fixture.destroy();
	});

	it('component should created', () => {
		expect(component).toBeDefined();
	});

	describe('ngOnChanges', () => {
		it('should set active class to li with value in @Input selectedElement', () => {
			dir.selectedElement = 0;
			dir.ngOnChanges({});
			expect((<HTMLLIElement>li.nativeElement).classList.contains('active')).toBeTruthy();
		});

		it('should not set active class to li without value in @Input selectedElement', () => {
			dir.selectedElement = undefined;
			(<HTMLLIElement>li.nativeElement).setAttribute('class', 'active');
			dir.ngOnChanges({});
			expect((<HTMLLIElement>li.nativeElement).classList.contains('active')).not.toBeTruthy();
		});
	});
});
