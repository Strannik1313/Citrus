import { createReducer, on } from '@ngrx/store';
import dayjs from 'dayjs';
import { nextWeek } from './calendar.actions';

export const initialState: Array<string> = [];
function createWeek() {
	const week = [];
	for (let i = 0; i < 5; i++) {
		week.push(dayjs().startOf('week').add(i, 'day').toString());
	}
	return week;
}
export const calendarReducer = createReducer(
	initialState,
	on(nextWeek, state => {
		return [...state, ...createWeek()];
	}),
);
