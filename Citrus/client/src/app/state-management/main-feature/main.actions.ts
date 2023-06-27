import { createAction } from '@ngrx/store';

export enum MainActions {
	HideSnakeBarAction = '[Main Page] HideSnakeBarAction',
	ShowSnakeBarAction = '[Main Page] ShowSnakeBarAction',
}

export const hideSnakeBar = createAction(MainActions.HideSnakeBarAction);
export const showSnakeBar = createAction(MainActions.ShowSnakeBarAction);
