import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import {
	AuthActions,
	getAuthUser,
	resetUser,
	setAuthForm,
	setIsLogged,
	setUser,
} from '@state-management/auth-feature/auth.actions';
import { AuthFormType } from '@enums/AuthFormType';
import { TypedActionWithPayload } from '@state-management/TypedActionWithPayload';
import { AuthForm } from '@interfaces/AuthForm';
import { AuthService } from '@api/AuthService';
import { UserDto } from '@models/UserDto';
import { UserRoles } from '@enums/UserRoles';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects implements OnInitEffects {
	constructor(private actions$: Actions, private router: Router, private authService: AuthService) {}

	ngrxOnInitEffects(): Action {
		return getAuthUser();
	}

	init$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ROUTER_NAVIGATION),
			map((action: RouterNavigationAction) => {
				if (action?.payload?.routerState?.url?.includes('/auth/login')) {
					return setAuthForm({ payload: AuthFormType.LOGIN });
				}
				if (action?.payload?.routerState?.url?.includes('/auth/register')) {
					return setAuthForm({ payload: AuthFormType.REGISTER });
				}
				return setAuthForm({ payload: AuthFormType.NONE });
			}),
		);
	});

	login$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.LoginAction),
			map((action: TypedActionWithPayload<AuthForm>) => action.payload),
			switchMap(authForm => {
				return this.authService.login(authForm).pipe(map(userDto => setUser({ payload: userDto })));
			}),
		);
	});

	register$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.RegisterAction),
			map((action: TypedActionWithPayload<AuthForm>) => action.payload),
			switchMap(authForm => {
				return this.authService.register(authForm).pipe(map(userDto => setUser({ payload: userDto })));
			}),
		);
	});

	logout$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.LogoutAction),
			switchMap(() => {
				return this.authService.logout().pipe(map(() => resetUser()));
			}),
		);
	});

	setUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.SetUserAction),
			map((action: TypedActionWithPayload<UserDto>) => action.payload),
			map(user => {
				if (user.role !== UserRoles.UNAUTHORIZED_USER) return setIsLogged({ payload: true });
				return setIsLogged({ payload: false });
			}),
		);
	});

	setIsLogged$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(AuthActions.SetIsLoggedAction),
				map(() => this.router.navigate([NAVIGATE_ROUTES.HOME])),
			);
		},
		{ dispatch: false },
	);

	resetUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.ResetUserAction),
			map(() => setIsLogged({ payload: false })),
		);
	});

	getAuthUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthActions.GetAuthUserAction),
			switchMap(() => {
				return this.authService.currentUser().pipe(map(user => setUser({ payload: user })));
			}),
		);
	});
}
