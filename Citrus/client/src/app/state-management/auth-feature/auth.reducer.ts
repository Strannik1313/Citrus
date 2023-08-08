import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthFormType } from '@enums/AuthFormType';
import {
	setAuthButtonsLoadingState,
	setAuthForm,
	setAuthFormDisabled,
	setAuthFormResponseError,
	setIsLogged,
	setUser,
} from '@state-management/auth-feature/auth.actions';
import { UserDto } from '@models/UserDto';
import equal from 'fast-deep-equal/es6';

export const authFeatureKey = 'auth';

export interface AuthReducer {
	isLogged: boolean;
	isLoadingAuthButtons: boolean;
	isAuthFormDisabled: boolean;
	authForm: AuthFormType;
	authFormError: string | null;
	user: UserDto | null;
}

export const authInitialState: AuthReducer = {
	isLogged: false,
	isLoadingAuthButtons: true,
	isAuthFormDisabled: false,
	authForm: AuthFormType.NONE,
	authFormError: null,
	user: null,
};

export const AuthFeature = createFeature({
	name: authFeatureKey,
	reducer: createReducer(
		authInitialState,
		on(setIsLogged, (state, action) => {
			return action.payload === state.isLogged
				? state
				: {
						...state,
						isLogged: action.payload,
				  };
		}),
		on(setAuthForm, (state, action) => {
			return action.payload === state.authForm
				? state
				: {
						...state,
						authForm: action.payload,
				  };
		}),
		on(setUser, (state, { payload }) => {
			return equal(state.user, payload)
				? state
				: {
						...state,
						user: payload,
				  };
		}),
		on(setAuthButtonsLoadingState, (state, { payload }) => {
			return equal(state.isLoadingAuthButtons, payload)
				? state
				: {
						...state,
						isLoadingAuthButtons: payload,
				  };
		}),
		on(setAuthFormDisabled, (state, { payload }) => {
			return state.isAuthFormDisabled === payload
				? state
				: {
						...state,
						isAuthFormDisabled: payload,
				  };
		}),
		on(setAuthFormResponseError, (state, { payload }) => {
			return state.authFormError === payload
				? state
				: {
						...state,
						authFormError: payload,
				  };
		}),
	),
});

export const {
	name,
	reducer,
	selectIsLogged,
	selectAuthForm,
	selectIsLoadingAuthButtons,
	selectUser,
	selectIsAuthFormDisabled,
	selectAuthFormError,
} = AuthFeature;
