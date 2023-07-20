import * as fromReducer from './main.reducer';
import { hideSnakeBar, showSnakeBar } from '@state-management/main-feature/main.actions';

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
});
