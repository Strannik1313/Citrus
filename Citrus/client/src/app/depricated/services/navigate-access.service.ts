// import { Injectable, OnDestroy } from '@angular/core';
// import {
// 	ActivatedRouteSnapshot,
// 	CanActivate,
// 	Router,
// 	RouterStateSnapshot,
// } from '@angular/router';
// import { AccessMap } from '@models/access-map';
// import { StorageService } from '@services/storage.service';
// import { Observable, Subscription } from 'rxjs';

// @Injectable({
// 	providedIn: 'root',
// })
// export class NavigateAccess implements CanActivate, OnDestroy {
// 	private subscription: Subscription;
// 	private accessMap: AccessMap = new AccessMap();

// 	constructor(private route: Router, private storage: StorageService) {
// 		this.subscription = this.storage?.accessMap$?.subscribe(
// 			data => (this.accessMap = data),
// 		);
// 	}
// 	canActivate(
// 		next: ActivatedRouteSnapshot,
// 		state: RouterStateSnapshot,
// 	): Observable<boolean> | boolean {
// 		switch (state.url) {
// 			case '/login': {
// 				if (!this.accessMap.loginPage) {
// 					this.route.navigate(['/']);
// 				}
// 				return this.accessMap.loginPage;
// 			}
// 			case '/register': {
// 				if (!this.accessMap.registerPage) {
// 					this.route.navigate(['/']);
// 				}
// 				return this.accessMap.registerPage;
// 			}
// 			case '/account': {
// 				if (!this.accessMap.accountPage) {
// 					this.route.navigate(['/']);
// 				}
// 				return this.accessMap.accountPage;
// 			}
// 			case '/deal': {
// 				if (!this.accessMap.accountPage) {
// 					this.route.navigate(['/']);
// 				}
// 				return this.accessMap.accountPage;
// 			}
// 			default:
// 				return false;
// 		}
// 	}

// 	ngOnDestroy(): void {
// 		this.subscription.unsubscribe();
// 	}
// }
