import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ServiceListComponent } from '@components/ui/service-list/service-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { MockFirstLetterUppercasePipe } from '../../../tests/mockPipes/mockFirstLetterUppercasePipe';
import { first } from 'rxjs';
import { Service } from '@models/service';
import { MockService } from '../../../tests/mockData/mockService';
import { MockDirective } from '../../../tests/mockData/mockDirective';

describe('Dialog window component', () => {
	let fixture: ComponentFixture<ServiceListComponent>;
	let component: ServiceListComponent;
	let matCard: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [
				ServiceListComponent,
				MockFirstLetterUppercasePipe,
				MockDirective({
					selector: '[appAddActiveClass]',
					inputs: ['selectedElement'],
				}),
				MockDirective({
					selector: '[appAutoscroll]',
				}),
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ServiceListComponent);
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

	describe('onServiceClick', () => {
		it('should call serviceClick when clicked on mat-card', () => {
			spyOn(component.serviceClick, 'emit').and.callThrough();
			spyOn(component, 'onServiceClick').and.callThrough();
			component.onServiceClick({ ...MockService });
			expect(component.onServiceClick).toHaveBeenCalledOnceWith({
				...MockService,
			});
		});
	});

	describe('trackByFn', () => {
		it('should call trackByFn with mockService when mat-cards rendering', () => {
			spyOn(component, 'trackByFn');
			component.services = [{ ...MockService }];
			fixture.detectChanges();
			matCard = fixture.debugElement.query(By.css('.card__item'));
			expect(component.trackByFn).toHaveBeenCalledOnceWith(0, {
				...MockService,
			});
		});
	});

	describe('trackByFn', () => {
		it('trackByFn should return id when mat-cards rendering', () => {
			spyOn(component, 'trackByFn').and.callThrough();
			let expected = component.trackByFn(0, { ...MockService });
			expect(expected).toEqual(1);
		});
	});

	describe('serviceClick', () => {
		it('serviceClick should raise event when mat-card click ', () => {
			let expected: Service = { ...MockService };
			component.serviceClick
				.pipe(first())
				.subscribe((value: Service) => (expected = value));
			matCard.triggerEventHandler('click', { ...MockService });
			expect(expected).toEqual({ ...MockService });
		});
	});
});
