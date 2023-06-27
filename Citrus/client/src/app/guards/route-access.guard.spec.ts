import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RouteAccessGuard } from './route-access.guard.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { asyncData } from '@tests/async-observable-helper/async-observable-helper';
import { MockUrlEnum } from '@tests/mockData/mockUrlEnum';
import 'zone.js/testing';

describe('RouteAccessGuard', () => {
	let guard: RouteAccessGuard;
	let storeSpy = jasmine.createSpyObj('Store', ['select']);
	let router: Router;
	let activatedRouter: ActivatedRoute;
	let accessValueFromStore = true;
	storeSpy.select.and.returnValue(asyncData(accessValueFromStore));

	beforeEach(fakeAsync(() => {
		TestBed.configureTestingModule({
			providers: [
				RouteAccessGuard,
				Store,
				{
					provide: Router,
					useValue: {
						routerState: { snapshot: { url: '' } },
						navigate() {
							return undefined;
						},
					},
				},
				{ provide: ActivatedRoute, useValue: { snapshot: {} } },
			],
		});
		router = TestBed.inject(Router);
		activatedRouter = TestBed.inject(ActivatedRoute);
		guard = new RouteAccessGuard(storeSpy, router);
		tick();
	}));

	afterAll(() => {
		guard.ngOnDestroy();
	});

	describe('constructor', () => {
		it('should be created', () => {
			expect(guard).toBeTruthy();
		});
		it('should set isWizardAvailable', () => {
			expect(guard.isWizardAvailable).toEqual(true);
		});
	});

	describe('canActivate', () => {
		beforeEach(() => {
			router.routerState.snapshot.url = MockUrlEnum.WIZARD;
		});
		it('should return true', () => {
			guard.isWizardAvailable = true;
			expect(guard.canActivate(activatedRouter.snapshot, router.routerState.snapshot)).toBeTrue();
		});
		it('should call navigate()', () => {
			guard.isWizardAvailable = false;
			let routerSpy = spyOn(router, 'navigate');
			guard.canActivate(activatedRouter.snapshot, router.routerState.snapshot);
			expect(routerSpy).toHaveBeenCalled();
		});
		it('should return false by default', () => {
			router.routerState.snapshot.url = '/fakeUrl';
			expect(guard.canActivate(activatedRouter.snapshot, router.routerState.snapshot)).toBeFalse();
		});
	});
});
