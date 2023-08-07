import { createAction, props } from '@ngrx/store';
import { AuthFormType } from '@enums/AuthFormType';
import { AuthForm } from '@interfaces/AuthForm';
import { UserDto } from '@models/UserDto';

export enum AuthActions {
	SetIsLoggedAction = '[Auth Page] SetIsLoggedAction',
	SetAuthFormAction = '[Auth Page] SetAuthFormAction',
	LoginAction = '[Auth Page] LoginAction',
	RegisterAction = '[Auth Page] RegisterAction',
	LogoutAction = '[Auth Page] LogoutAction',
	SetUserAction = '[Auth Page] SetUserAction',
	ResetUserAction = '[Auth Page] ResetUserAction',
	GetAuthUserAction = '[Auth Page] GetAuthUserAction',
}

export const setIsLogged = createAction(AuthActions.SetIsLoggedAction, props<{ payload: boolean }>());
export const setAuthForm = createAction(AuthActions.SetAuthFormAction, props<{ payload: AuthFormType }>());
export const login = createAction(AuthActions.LoginAction, props<{ payload: AuthForm }>());
export const register = createAction(AuthActions.RegisterAction, props<{ payload: AuthForm }>());
export const logout = createAction(AuthActions.LogoutAction);
export const setUser = createAction(AuthActions.SetUserAction, props<{ payload: UserDto }>());
export const resetUser = createAction(AuthActions.ResetUserAction);
export const getAuthUser = createAction(AuthActions.GetAuthUserAction);
