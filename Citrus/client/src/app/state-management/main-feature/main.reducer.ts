import { createFeature, createReducer, on } from '@ngrx/store';
import { hideSnakeBar, showSnakeBar } from '@state-management/main-feature/main.actions';

export const mainFeatureKey = 'main';

export interface MainReducer {
	showSnakeBar: boolean;
}

export const mainInitialState: MainReducer = {
	showSnakeBar: false,
};

export const MainFeature = createFeature({
	name: mainFeatureKey,
	reducer: createReducer(
		mainInitialState,
		on(hideSnakeBar, state => {
			return state.showSnakeBar
				? {
						...state,
						showSnakeBar: false,
				  }
				: state;
		}),
		on(showSnakeBar, state => {
			return !state.showSnakeBar
				? {
						...state,
						showSnakeBar: false,
				  }
				: state;
		}),
	),
});

export const { name, reducer, selectMainState, selectShowSnakeBar } = MainFeature;
