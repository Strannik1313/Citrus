import { ServerErrorHandleService } from './../../services/server-error-handle.service';
import { Observable, tap } from 'rxjs';
import {
	HttpInterceptor,
	HttpHandler,
	HttpEvent,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HttpResponseIntercepter implements HttpInterceptor {
	constructor(private serverErrorHandler: ServerErrorHandleService) {}
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap({
				error: error => {
					this.serverErrorHandler.setErrorInstance(error);
				},
			}),
		);
	}
}
