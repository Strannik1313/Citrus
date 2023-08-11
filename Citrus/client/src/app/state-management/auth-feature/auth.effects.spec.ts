import { Observable, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AuthEffects } from '@state-management/auth-feature/auth.effects';
import { MockAuthForm, MockUrl, MockUserDto, MockWizardSelectors } from '@tests/mock-constants';
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthService } from '@api/AuthService';
import {
	getAuthUser,
	login,
	logout,
	register,
	resetUser,
	setAuthButtonsLoadingState,
	setAuthForm,
	setAuthFormDisabled,
	setAuthFormResponseError,
	setIsLogged,
	setUser,
} from '@state-management/auth-feature/auth.actions';
import { AuthFormType } from '@enums/AuthFormType';
import { cold, hot } from 'jasmine-marbles';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { setUrlBeforeAuthNavigation } from '@state-management/main-feature/main.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { UserRoles } from '@enums/UserRoles';
import { MockAuthService, MockRouter } from '@tests/mock-services';

describe('AuthEffects', () => {
	let actions$: Observable<Action>;
	let effects: AuthEffects;
	let router: Router;
	let authService: AuthService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				AuthEffects,
				provideMockStore({
					selectors: MockWizardSelectors,
				}),
				provideMockActions(() => actions$),
				{
					provide: Router,
					useValue: MockRouter,
				},
				{
					provide: AuthService,
					useValue: MockAuthService,
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		actions$ = new Observable<Action>();
		effects = TestBed.inject(AuthEffects);
		router = TestBed.inject(Router);
		authService = TestBed.inject(AuthService);
	});

	it('ngrxOnInitEffects', () => {
		effects.ngrxOnInitEffects();
		expect(effects.ngrxOnInitEffects()).toEqual(getAuthUser());
	});

	describe('init$', () => {
		it('calls setAuthForm() with login type', () => {
			actions$ = hot('a', { a: { type: ROUTER_NAVIGATION, payload: { routerState: { url: '/auth/login' } } } });
			effects.init$.subscribe(action => {
				expect(action).toEqual(setAuthForm({ payload: AuthFormType.LOGIN }));
			});
		});

		it('calls setAuthForm() with register type', () => {
			actions$ = hot('a', { a: { type: ROUTER_NAVIGATION, payload: { routerState: { url: '/auth/register' } } } });
			effects.init$.subscribe(action => {
				expect(action).toEqual(setAuthForm({ payload: AuthFormType.REGISTER }));
			});
		});

		it('calls setAuthForm() with none type', () => {
			actions$ = hot('a', { a: { type: ROUTER_NAVIGATION, payload: { routerState: { url: '/auth' } } } });
			effects.init$.subscribe(action => {
				expect(action).toEqual(setAuthForm({ payload: AuthFormType.NONE }));
			});
		});
	});

	describe('login$', () => {
		beforeEach(() => {
			actions$ = cold('a', { a: login({ payload: MockAuthForm }) });
		});
		it('reset auth form, set user and navigate to previous page', () => {
			const spy = spyOn(router, 'navigate');
			const expected = hot('(bcde)', {
				b: setUser({ payload: MockUserDto }),
				c: setAuthFormDisabled({ payload: false }),
				d: setAuthFormResponseError({ payload: null }),
				e: setUrlBeforeAuthNavigation({ payload: '' }),
			});
			effects.login$.subscribe(() => {
				expect(spy).toHaveBeenCalledOnceWith([MockUrl]);
			});
			expect(effects.login$).toBeObservable(expected);
		});

		it('return observable with setAuthFormResponseError() when response error ', () => {
			spyOn(authService, 'login').and.returnValue(throwError(() => new HttpErrorResponse({ error: 'mockMessage' })));
			const expected = cold('b', { b: setAuthFormResponseError({ payload: 'mockMessage' }) });
			expect(effects.login$).toBeObservable(expected);
		});
	});

	describe('register$', () => {
		beforeEach(() => {
			actions$ = cold('a', { a: register({ payload: MockAuthForm }) });
		});
		it('reset auth form errors, enable form and navigate to /login', () => {
			const spy = spyOn(router, 'navigate');
			const expected = hot('(bc)', {
				b: setAuthFormDisabled({ payload: false }),
				c: setAuthFormResponseError({ payload: null }),
			});
			effects.login$.subscribe(() => {
				expect(spy).toHaveBeenCalledOnceWith([NAVIGATE_ROUTES.LOGIN]);
			});
			expect(effects.register$).toBeObservable(expected);
		});

		it('return observable with setAuthFormResponseError() when response error ', () => {
			spyOn(authService, 'register').and.returnValue(throwError(() => new HttpErrorResponse({ error: 'mockMessage' })));
			const expected = cold('b', { b: setAuthFormResponseError({ payload: 'mockMessage' }) });
			expect(effects.register$).toBeObservable(expected);
		});
	});

	describe('disableAuthForm$', () => {
		it('login() disable auth form', () => {
			actions$ = cold('a', { a: login({ payload: MockAuthForm }) });
			const expected = hot('b', {
				b: setAuthFormDisabled({ payload: true }),
			});
			expect(effects.disableAuthForm$).toBeObservable(expected);
		});

		it('register() disable auth form', () => {
			actions$ = cold('a', { a: register({ payload: MockAuthForm }) });
			const expected = hot('b', {
				b: setAuthFormDisabled({ payload: true }),
			});
			expect(effects.disableAuthForm$).toBeObservable(expected);
		});
	});

	describe('logout$', () => {
		it('logout() reset current user', () => {
			actions$ = cold('a', {
				a: logout(),
			});
			const expected = hot('b', {
				b: resetUser(),
			});
			expect(effects.logout$).toBeObservable(expected);
		});
	});

	describe('setUser$', () => {
		it('if user is authUser setUser() calls setIsLogged() with true', () => {
			actions$ = cold('a', {
				a: setUser({ payload: MockUserDto }),
			});
			const expected = hot('b', {
				b: setIsLogged({ payload: true }),
			});
			expect(effects.setUser$).toBeObservable(expected);
		});

		it('if user is unAuthUser setUser() calls setIsLogged() with false', () => {
			actions$ = cold('a', {
				a: setUser({ payload: { ...MockUserDto, role: UserRoles.UNAUTHORIZED_USER } }),
			});
			const expected = hot('b', {
				b: setIsLogged({ payload: false }),
			});
			expect(effects.setUser$).toBeObservable(expected);
		});
	});

	describe('resetUser$', () => {
		it('resetUser() calls setIsLogged() with false', () => {
			actions$ = cold('a', {
				a: resetUser(),
			});
			const expected = hot('b', {
				b: setIsLogged({ payload: false }),
			});
			expect(effects.resetUser$).toBeObservable(expected);
		});
	});

	describe('getAuthUser$', () => {
		it('getAuthUser() sets user and show auth buttons', () => {
			actions$ = cold('a', {
				a: getAuthUser(),
			});
			const expected = hot('(bc)', {
				b: setUser({ payload: MockUserDto }),
				c: setAuthButtonsLoadingState({ payload: false }),
			});
			expect(effects.getAuthUser$).toBeObservable(expected);
		});

		it('getAuthUser() show auth buttons when response error', () => {
			spyOn(authService, 'currentUser').and.returnValue(
				throwError(() => new HttpErrorResponse({ error: 'mockError' })),
			);
			actions$ = cold('a', {
				a: getAuthUser(),
			});
			const expected = hot('b', {
				b: setAuthButtonsLoadingState({ payload: false }),
			});
			expect(effects.getAuthUser$).toBeObservable(expected);
		});
	});

	describe('setRegisterResponseError$', () => {
		it('setAuthFormResponseError() enables auth form', () => {
			actions$ = cold('a', {
				a: setAuthFormResponseError({ payload: 'mockError' }),
			});
			const expected = hot('b', {
				b: setAuthFormDisabled({ payload: false }),
			});
			expect(effects.setRegisterResponseError$).toBeObservable(expected);
		});
	});
});
