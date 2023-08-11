import * as fromReducer from './auth.reducer';
import {
	setAuthButtonsLoadingState,
	setAuthForm,
	setAuthFormDisabled,
	setAuthFormResponseError,
	setIsLogged,
	setUser,
} from '@state-management/auth-feature/auth.actions';
import { AuthFormType } from '@enums/AuthFormType';
import { MockUserDto } from '@tests/mock-constants';

describe('AuthReducer', () => {
	let { authInitialState } = fromReducer;
	it('return default state', () => {
		const action = {
			type: 'Unknown',
		};
		const state = fromReducer.reducer(authInitialState, action);
		expect(state).toBe(authInitialState);
	});

	it('setIsLogged', () => {
		const action = setIsLogged({ payload: true });
		const firstState = fromReducer.reducer(authInitialState, action);
		expect(firstState).not.toBe(authInitialState);
		expect(firstState.isLogged).toBeTruthy();

		const secondState = fromReducer.reducer(firstState, action);
		expect(secondState).toBe(firstState);
	});

	it('setAuthForm', () => {
		const action = setAuthForm({ payload: AuthFormType.LOGIN });
		const firstState = fromReducer.reducer(authInitialState, action);
		expect(firstState).not.toBe(authInitialState);
		expect(firstState.authForm).toBe(AuthFormType.LOGIN);

		const secondState = fromReducer.reducer(firstState, action);
		expect(secondState).toBe(firstState);
	});

	it('setUser', () => {
		const action = setUser({ payload: MockUserDto });
		const firstState = fromReducer.reducer(authInitialState, action);
		expect(firstState).not.toBe(authInitialState);
		expect(firstState.user).toBe(MockUserDto);

		const secondState = fromReducer.reducer(firstState, action);
		expect(secondState).toBe(firstState);
	});

	it('setAuthButtonsLoadingState', () => {
		const action = setAuthButtonsLoadingState({ payload: false });
		const firstState = fromReducer.reducer(authInitialState, action);
		expect(firstState).not.toBe(authInitialState);
		expect(firstState.isLoadingAuthButtons).toBe(false);

		const secondState = fromReducer.reducer(firstState, action);
		expect(secondState).toBe(firstState);
	});

	it('setAuthFormDisabled', () => {
		const action = setAuthFormDisabled({ payload: true });
		const firstState = fromReducer.reducer(authInitialState, action);
		expect(firstState).not.toBe(authInitialState);
		expect(firstState.isAuthFormDisabled).toBe(true);

		const secondState = fromReducer.reducer(firstState, action);
		expect(secondState).toBe(firstState);
	});

	it('setAuthFormResponseError', () => {
		const action = setAuthFormResponseError({ payload: 'mockError' });
		const firstState = fromReducer.reducer(authInitialState, action);
		expect(firstState).not.toBe(authInitialState);
		expect(firstState.authFormError).toBe('mockError');

		const secondState = fromReducer.reducer(firstState, action);
		expect(secondState).toBe(firstState);
	});
});
