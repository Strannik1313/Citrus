import { createFeature, createReducer, on } from '@ngrx/store';
import { hideSnakeBar, setUrlBeforeAuthNavigation, showSnakeBar } from '@state-management/main-feature/main.actions';

export const mainFeatureKey = 'main';

export interface MainReducer {
	showSnakeBar: boolean;
	urlBeforeAuthNavigation: string;
}

export const mainInitialState: MainReducer = {
	showSnakeBar: false,
	urlBeforeAuthNavigation: '',
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
						showSnakeBar: true,
				  }
				: state;
		}),
		on(setUrlBeforeAuthNavigation, (state, { payload }) => {
			return state.urlBeforeAuthNavigation !== payload
				? {
						...state,
						urlBeforeAuthNavigation: payload,
				  }
				: state;
		}),
	),
});

export const { name, reducer, selectMainState, selectShowSnakeBar, selectUrlBeforeAuthNavigation } = MainFeature;
