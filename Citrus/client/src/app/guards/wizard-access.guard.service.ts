import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAcceptPageAvailable, selectIsWizardAvailable } from '@state-management/wizard-feature/wizard.reducer';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';

@Injectable({
	providedIn: 'root',
})
export class WizardAccessGuard implements CanActivate, OnDestroy {
	isWizardAvailable = false;
	isAcceptPageAvailable = false;
	private destroy$: Subject<void> = new Subject<void>();

	constructor(private store: Store, private router: Router) {
		this.store
			.select(selectIsWizardAvailable)
			.pipe(takeUntil(this.destroy$))
			.subscribe(access => (this.isWizardAvailable = access));
		this.store
			.select(selectIsAcceptPageAvailable)
			.pipe(takeUntil(this.destroy$))
			.subscribe(access => (this.isAcceptPageAvailable = access));
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		switch (state.url) {
			case NAVIGATE_ROUTES.WIZARD: {
				if (!this.isWizardAvailable) {
					this.router.navigate(['/']);
				}
				return true;
			}
			case NAVIGATE_ROUTES.ACCEPT: {
				if (!this.isAcceptPageAvailable) {
					this.router.navigate(['/']);
				}
				return true;
			}
		}
		return false;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
