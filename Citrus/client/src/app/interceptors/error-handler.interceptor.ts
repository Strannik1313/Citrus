import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { showSnakeBar } from '@state-management/main-feature/main.actions';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	constructor(private store: Store) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			tap({
				error: (error: HttpErrorResponse) => {
					if (error.status !== 401) this.store.dispatch(showSnakeBar());
				},
			}),
		);
	}
}
