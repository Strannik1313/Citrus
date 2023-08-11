import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { filter, map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUrl } from '@state-management/router-feature/router-selectors';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { resetWizard } from '@state-management/wizard-feature/wizard.actions';
import { Router } from '@angular/router';
import { setUrlBeforeAuthNavigation } from '@state-management/main-feature/main.actions';

@Injectable()
export class RouterEffects {
	constructor(private actions$: Actions, private store: Store, private router: Router) {}

	homeNavigated$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ROUTER_NAVIGATED),
			concatLatestFrom(() => this.store.select(selectUrl)),
			filter(([, route]) => route === NAVIGATE_ROUTES.HOME),
			switchMap(() => [resetWizard(), setUrlBeforeAuthNavigation({ payload: '' })]),
		);
	});

	saveRouteBeforeAuthNavigate$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ROUTER_NAVIGATION),
			concatLatestFrom(() => this.store.select(selectUrl)),
			filter(([, route]) => route.includes(NAVIGATE_ROUTES.AUTH) && !this.router.url.includes(NAVIGATE_ROUTES.AUTH)),
			map(() => setUrlBeforeAuthNavigation({ payload: this.router.url })),
		);
	});
}
