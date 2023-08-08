import { createAction, props } from '@ngrx/store';
import { AuthFormType } from '@enums/AuthFormType';
import { AuthForm } from '@interfaces/AuthForm';
import { UserDto } from '@models/UserDto';
import { AuthButtonsLoadingState } from '@interfaces/ComponentsLoadingState';
import { HttpErrorResponse } from '@angular/common/http';

export enum AuthActions {
	SetIsLoggedAction = '[Auth Page] SetIsLoggedAction',
	SetAuthFormAction = '[Auth Page] SetAuthFormAction',
	LoginAction = '[Auth Page] LoginAction',
	RegisterAction = '[Auth Page] RegisterAction',
	LogoutAction = '[Auth Page] LogoutAction',
	SetUserAction = '[Auth Page] SetUserAction',
	ResetUserAction = '[Auth Page] ResetUserAction',
	GetAuthUserAction = '[Auth Page] GetAuthUserAction',
	SetAuthButtonsLoadingStateAction = '[Auth Page] SetAuthButtonsLoadingStateAction',
	SetAuthFormResponseErrorAction = '[Auth Page] SetAuthFormResponseErrorAction',
	SetBadEmailOnRegisterAction = '[Auth Page] SetBadEmailOnRegisterAction',
	SetAuthFormDisabledAction = '[Auth Page] SetAuthFormDisabledAction',
}

export const setIsLogged = createAction(AuthActions.SetIsLoggedAction, props<{ payload: boolean }>());
export const setAuthForm = createAction(AuthActions.SetAuthFormAction, props<{ payload: AuthFormType }>());
export const login = createAction(AuthActions.LoginAction, props<{ payload: AuthForm }>());
export const register = createAction(AuthActions.RegisterAction, props<{ payload: AuthForm }>());
export const logout = createAction(AuthActions.LogoutAction);
export const setUser = createAction(AuthActions.SetUserAction, props<{ payload: UserDto }>());
export const resetUser = createAction(AuthActions.ResetUserAction);
export const getAuthUser = createAction(AuthActions.GetAuthUserAction);
export const setAuthButtonsLoadingState = createAction(
	AuthActions.SetAuthButtonsLoadingStateAction,
	props<{
		payload: AuthButtonsLoadingState;
	}>(),
);
export const setAuthFormResponseError = createAction(
	AuthActions.SetAuthFormResponseErrorAction,
	props<{
		payload: HttpErrorResponse;
	}>(),
);
export const setBadEmailOnRegister = createAction(
	AuthActions.SetBadEmailOnRegisterAction,
	props<{
		payload: boolean;
	}>(),
);
export const setAuthFormDisabled = createAction(
	AuthActions.SetAuthFormDisabledAction,
	props<{
		payload: boolean;
	}>(),
);
