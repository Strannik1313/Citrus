import * as fromReducer from './main.reducer';
import { hideSnakeBar, setUrlBeforeAuthNavigation, showSnakeBar } from '@state-management/main-feature/main.actions';
import { MockUrl } from '@tests/mock-constants';

describe('MainReducer', () => {
	const { mainInitialState } = fromReducer;

	it('hideSnakeBar', () => {
		const modifiedInitialState = { ...mainInitialState, showSnakeBar: true };
		const firstState = fromReducer.reducer(modifiedInitialState, hideSnakeBar());
		expect(firstState.showSnakeBar).toBeFalse();
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, hideSnakeBar());
		expect(secondState).toBe(firstState);
	});

	it('showSnakeBar', () => {
		const modifiedInitialState = { ...mainInitialState, showSnakeBar: false };
		const firstState = fromReducer.reducer(modifiedInitialState, showSnakeBar());
		expect(firstState.showSnakeBar).toBeTrue();
		expect(firstState).not.toBe(modifiedInitialState);

		const secondState = fromReducer.reducer(firstState, showSnakeBar());
		expect(secondState).toBe(firstState);
	});

	it('setUrlBeforeAuthNavigation', () => {
		const firstState = fromReducer.reducer(mainInitialState, setUrlBeforeAuthNavigation({ payload: MockUrl }));
		expect(firstState.urlBeforeAuthNavigation).toBe(MockUrl);
		expect(firstState).not.toBe(mainInitialState);

		const secondState = fromReducer.reducer(firstState, setUrlBeforeAuthNavigation({ payload: MockUrl }));
		expect(secondState).toBe(firstState);
	});
});
