import { Action } from '@ngrx/store';

export enum WizardActionsEnum {
	LOAD_INITIAL_CONTENT_REQUEST_ACTION = '[wizard] LOAD_INITIAL_CONTENT_REQUEST',
}

export class LOAD_INITIAL_CONTENT_REQUEST implements Action {
	public readonly type = WizardActionsEnum.LOAD_INITIAL_CONTENT_REQUEST_ACTION;
}

// export class SET_INTERVIEWS implements Action {
//   public readonly type = EInterviewsPageActions.SET_INTERVIEWS_ACTION;
//
//   constructor(public payload: PageResponseDto) { }
// }

export type WizardActions = LOAD_INITIAL_CONTENT_REQUEST;
