import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { catchError, filter, Observable, switchMap } from 'rxjs';
import { AuthService } from '@api/AuthService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	private acceptToken = '';
	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const clone = request.clone();
		if (!!this.acceptToken) {
			clone.headers.set('Authorization', this.acceptToken);
		}
		return next.handle(clone).pipe(
			filter(event => event instanceof HttpResponse),
			catchError(error => {
				if (
					error instanceof HttpErrorResponse &&
					error.status === 401 &&
					!error.url?.includes('/api/auth/refresh-tokens')
				) {
					return this.authService.refreshTokens().pipe(
						switchMap(token => {
							this.acceptToken = token.accept;
							const clone = request.clone({
								setHeaders: { Authorization: this.acceptToken },
							});
							return next.handle(clone);
						}),
					);
				}
				throw error;
			}),
		);
	}
}
