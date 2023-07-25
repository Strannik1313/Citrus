import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RouteAccessGuard } from './route-access.guard.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { asyncData } from '@tests/async-observable-helper/async-observable-helper';
import 'zone.js/testing';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';

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
		it('should return false by default', () => {
			router.routerState.snapshot.url = '/fakeUrl';
			expect(guard.canActivate(activatedRouter.snapshot, router.routerState.snapshot)).toBeFalse();
		});

		describe('access to /deal', () => {
			beforeEach(() => {
				router.routerState.snapshot.url = NAVIGATE_ROUTES.WIZARD;
			});
			it('should return true', () => {
				guard.isWizardAvailable = true;
				expect(guard.canActivate(activatedRouter.snapshot, router.routerState.snapshot)).toBeTrue();
			});
			it('should call navigate()', () => {
				guard.isWizardAvailable = false;
				let routerSpy = spyOn(router, 'navigate');
				guard.canActivate(activatedRouter.snapshot, router.routerState.snapshot);
				expect(routerSpy).toHaveBeenCalledOnceWith(['/']);
			});
		});

		describe('access to /deal/accept', () => {
			beforeEach(() => {
				router.routerState.snapshot.url = NAVIGATE_ROUTES.ACCEPT;
			});

			it('return true if accept page is available', () => {
				guard.isAcceptPageAvailable = true;
				expect(guard.canActivate(activatedRouter.snapshot, router.routerState.snapshot)).toBeTrue();
			});

			it('calls navigate() if accept page is not available', () => {
				guard.isAcceptPageAvailable = false;
				let routerSpy = spyOn(router, 'navigate');
				guard.canActivate(activatedRouter.snapshot, router.routerState.snapshot);
				expect(routerSpy).toHaveBeenCalledOnceWith(['/']);
			});
		});
	});
});
