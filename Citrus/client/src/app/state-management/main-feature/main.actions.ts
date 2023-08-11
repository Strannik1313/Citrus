import { createAction, props } from '@ngrx/store';

export enum MainActions {
	HideSnakeBarAction = '[Main Page] HideSnakeBarAction',
	ShowSnakeBarAction = '[Main Page] ShowSnakeBarAction',
	SetUrlBeforeAuthNavigationAction = '[Main Page] SetUrlBeforeAuthNavigationAction',
}

export const hideSnakeBar = createAction(MainActions.HideSnakeBarAction);
export const showSnakeBar = createAction(MainActions.ShowSnakeBarAction);
export const setUrlBeforeAuthNavigation = createAction(
	MainActions.SetUrlBeforeAuthNavigationAction,
	props<{ payload: string }>(),
);
