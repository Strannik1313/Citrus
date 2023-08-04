import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptPageComponent } from './accept-page.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BUTTON_LABELS } from '@enums/labels/ButtonLabels';
import { LABELS } from '@enums/labels/Labels';

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

	afterEach(() => {
		fixture.destroy();
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

	describe('template labels', () => {
		let btn: DebugElement;
		let p: DebugElement;
		beforeEach(() => {
			btn = fixture.debugElement.query(By.css('[data-testid="accept-page-button"]'));
			p = fixture.debugElement.query(By.css('[data-testid="accept-page-paragraph"]'));
		});

		it('button labels is right', () => {
			expect(btn.nativeElement.textContent).toBe(BUTTON_LABELS.OK);
		});

		it('button labels is right', () => {
			expect(p.nativeElement.textContent).toBe(LABELS.ORDER_CREATED);
		});
	});
});
