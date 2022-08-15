import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthHttpService } from '@services/auth-http.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private authHttp: AuthHttpService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		if (this.authHttp.isAuthenticated()) {
			req = req.clone({
				setHeaders: {
					Authorization: this.authHttp.getToken(),
				},
			});
		}
		return next.handle(req);
	}
}
