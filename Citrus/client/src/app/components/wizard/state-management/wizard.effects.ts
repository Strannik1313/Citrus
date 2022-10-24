import { Injectable } from '@angular/core';
import { Actions, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LOAD_INITIAL_CONTENT_REQUEST } from '@components/wizard/state-management/wizard.actions';

@Injectable()
export class WizardEffects implements OnInitEffects {
	constructor(private readonly actions$: Actions) {}

	// resetEditModeData$ = createEffect(() =>
	//   this.actions$.pipe(
	//     ofType<SET_EDIT_MODE>(EInterviewsPageActions.SET_EDIT_MODE_ACTION),
	//     filter(action => !action.payload),
	//     concatLatestFrom(() => this.store.pipe(select(interviewSelector))),
	//     map(([, interview]: [Action, InterviewDto]) =>
	//       new SET_EDIT_MODE_ITEMS(InterviewsPageHelper.getEditModeModel(interview)))
	//   )
	// );

	ngrxOnInitEffects(): Action {
		return new LOAD_INITIAL_CONTENT_REQUEST();
	}
}
