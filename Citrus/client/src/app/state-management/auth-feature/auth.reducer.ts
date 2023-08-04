import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthFormType } from '@enums/AuthFormType';
import { setAuthForm, setIsLogged, setUser } from '@state-management/auth-feature/auth.actions';
import { UserDto } from '@models/UserDto';
import equal from 'fast-deep-equal/es6';

export const authFeatureKey = 'auth';

export interface AuthReducer {
	isLogged: boolean;
	authForm: AuthFormType;
	user: UserDto | null;
}

export const authInitialState: AuthReducer = {
	isLogged: false,
	authForm: AuthFormType.NONE,
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
	),
});

export const { name, reducer, selectIsLogged, selectAuthForm } = AuthFeature;
