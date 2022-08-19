import { Observable, tap } from 'rxjs';
import {
	HttpInterceptor,
	HttpHandler,
	HttpEvent,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerErrorHandleService } from '@services/server-error-handle.service';

@Injectable({
	providedIn: 'root',
})
export class HttpResponseIntercepter implements HttpInterceptor {
	constructor(private serverErrorHandler: ServerErrorHandleService) {}
	intercept(
		/*eslint-disable @typescript-eslint/no-explicit-any */
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		/*eslint-enable @typescript-eslint/no-explicit-any */
		return next.handle(req).pipe(
			tap({
				error: error => {
					this.serverErrorHandler.setErrorInstance(error);
				},
			}),
		);
	}
}
