import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
	combineLatestWith,
	finalize,
	map,
	Observable,
	take,
	timer,
} from 'rxjs';
import { SPINNER_TIME } from 'src/app/InjectionsToken/InjectionToken';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class SpinnerActivator implements HttpInterceptor {
	constructor(
		@Inject(SPINNER_TIME) private spinnerTime: number,
		private storage: StorageService,
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		this.storage.setInitializeStatus(true);
		return next.handle(req).pipe(
			combineLatestWith(timer(this.spinnerTime).pipe(take(1))),
			map(([e1, e2]) => e1),
			finalize(() => {
				this.storage.setInitializeStatus(false);
			}),
		);
	}
}
