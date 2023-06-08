import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { WizardFeature } from '@components/ui/wizard/state-management/wizard.reducer';

@Injectable({
	providedIn: 'root',
})
export class AccessGuard implements CanActivate, OnDestroy {
	private isWizardAvailable = false;
	private destroy$: Subject<void> = new Subject<void>();

	constructor(private store: Store, private router: Router) {
		this.store
			.select(WizardFeature.selectIsWizardAvailable)
			.pipe(takeUntil(this.destroy$))
			.subscribe(access => (this.isWizardAvailable = access));
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		switch (state.url) {
			case '/deal': {
				if (!this.isWizardAvailable) {
					this.router.navigate(['/']);
				}
				return true;
			}
		}
		return true;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
