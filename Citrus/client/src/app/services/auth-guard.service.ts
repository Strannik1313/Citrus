import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHttpService } from './auth-http.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		if (this.authHttp.getToken() !== '') {
			return true;
		}
		this.router.navigate(['/']);
		return false;
	}

	constructor(private authHttp: AuthHttpService, private router: Router) {}
}
