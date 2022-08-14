// import { Injectable } from '@angular/core';
// import {
// 	ActivatedRouteSnapshot,
// 	CanActivate,
// 	Router,
// 	RouterStateSnapshot,
// } from '@angular/router';
// import { HttpService } from '@services/http.service';
// import { Observable } from 'rxjs';

// @Injectable({
// 	providedIn: 'root',
// })
// export class AuthGuardService implements CanActivate {
// 	canActivate(
// 		next: ActivatedRouteSnapshot,
// 		state: RouterStateSnapshot,
// 	): Observable<boolean> | boolean {
// 		if (this.http.getToken() !== '') {
// 			return true;
// 		}
// 		this.router.navigate(['/']);
// 		return false;
// 	}

// 	constructor(private http: HttpService, private router: Router) {}
// }
