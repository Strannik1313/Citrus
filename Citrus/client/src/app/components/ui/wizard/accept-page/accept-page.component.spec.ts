import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptPageComponent } from './accept-page.component';
import { Router } from '@angular/router';

describe('AcceptPageComponent', () => {
	let component: AcceptPageComponent;
	let fixture: ComponentFixture<AcceptPageComponent>;
	let router: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AcceptPageComponent],
			providers: [
				{
					provide: Router,
					useValue: {
						navigate() {
							return undefined;
						},
					},
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AcceptPageComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('onBtnClick', () => {
		it('call router navigate', () => {
			let spy = spyOn(router, 'navigate');
			component.onBtnClick();
			expect(spy).toHaveBeenCalledOnceWith(['/']);
		});
	});
});
