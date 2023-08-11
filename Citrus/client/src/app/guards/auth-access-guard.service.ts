import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { NAVIGATE_ROUTES } from '@enums/NavigateRoutes';
import { selectIsLoadingAuthButtons, selectIsLogged } from '@state-management/auth-feature/auth.reducer';

@Injectable({
	providedIn: 'root',
})
export class AuthAccessGuard implements CanActivate, OnDestroy {
	isUserLogged = false;
	isUserInitializing = false;
	private destroy$: Subject<void> = new Subject<void>();

	constructor(private store: Store, private router: Router) {
		this.store
			.select(selectIsLogged)
			.pipe(takeUntil(this.destroy$))
			.subscribe(isLogged => (this.isUserLogged = isLogged));
		this.store
			.select(selectIsLoadingAuthButtons)
			.pipe(takeUntil(this.destroy$))
			.subscribe(authButtonState => (this.isUserInitializing = authButtonState));
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		switch (state.url) {
			case NAVIGATE_ROUTES.AUTH: {
				if (this.isUserLogged || this.isUserInitializing) {
					this.router.navigate(['/']);
				}
				return true;
			}
			case NAVIGATE_ROUTES.REGISTER: {
				if (this.isUserLogged || this.isUserInitializing) {
					this.router.navigate(['/']);
				}
				return true;
			}
			case NAVIGATE_ROUTES.LOGIN: {
				if (this.isUserLogged || this.isUserInitializing) {
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
