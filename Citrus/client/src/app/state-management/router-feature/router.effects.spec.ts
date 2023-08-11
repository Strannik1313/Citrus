import { TestBed } from '@angular/core/testing';
import { RouterEffects } from '@state-management/router-feature/router.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { MockRouter } from '@tests/mock-services';
import { of } from 'rxjs';
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { selectUrl } from '@state-management/router-feature/router-selectors';
import { cold } from 'jasmine-marbles';
import { resetWizard } from '@state-management/wizard-feature/wizard.actions';
import { setUrlBeforeAuthNavigation } from '@state-management/main-feature/main.actions';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { mockRouterUrl } from '@tests/mock-constants';

describe('RouterEffects', () => {
	let actions$: Actions;
	let store: MockStore;
	let effects: RouterEffects;
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				RouterEffects,
				provideMockStore({}),
				provideMockActions(() => actions$),
				{
					provide: Router,
					useValue: MockRouter,
				},
			],
		});
		store = TestBed.inject(MockStore);
		effects = TestBed.inject(RouterEffects);
	});

	describe('homeNavigated$', () => {
		it('if new url is /home then reset wizard and reset saved in state url', () => {
			actions$ = of({ type: ROUTER_NAVIGATED });
			selectUrl.setResult(NAVIGATE_ROUTES.HOME);
			store?.refreshState();
			const expected = cold('(ab|)', {
				a: resetWizard(),
				b: setUrlBeforeAuthNavigation({ payload: '' }),
			});
			expect(effects.homeNavigated$).toBeObservable(expected);
		});

		describe('saveRouteBeforeAuthNavigate$', () => {
			it('save new url if it is not equal /login and /register', () => {
				actions$ = of({ type: ROUTER_NAVIGATION });
				selectUrl.setResult(NAVIGATE_ROUTES.LOGIN);
				store?.refreshState();
				const expected = cold('(a|)', {
					a: setUrlBeforeAuthNavigation({ payload: mockRouterUrl }),
				});
				expect(effects.saveRouteBeforeAuthNavigate$).toBeObservable(expected);
			});
		});
	});
});
