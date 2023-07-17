import { TestBed } from '@angular/core/testing';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { showSnakeBar } from '@state-management/main-feature/main.actions';

describe('ErrorHandlerInterceptor', () => {
	let store: MockStore;
	let interceptor: ErrorHandlerInterceptor;

	let initialState = {};
	let mockRequest: HttpRequest<unknown>;
	let mockHandler: HttpHandler;

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpHandler,
					useValue: {
						handle: (request: HttpRequest<unknown>) => request,
					},
				},
				{
					provide: HttpRequest,
					useValue: throwError(() => new Error('')),
				},
				ErrorHandlerInterceptor,
				provideMockStore({ initialState }),
			],
		}),
	);

	beforeEach(() => {
		store = TestBed.inject(MockStore);
		interceptor = TestBed.inject(ErrorHandlerInterceptor);
		mockRequest = TestBed.inject(HttpRequest);
		mockHandler = TestBed.inject(HttpHandler);
	});

	it('should be created', () => {
		expect(interceptor).toBeTruthy();
	});

	it('dispatch showSnakeBar action after error is thrown', () => {
		let spy = spyOn(store, 'dispatch');
		interceptor.intercept(mockRequest, mockHandler).subscribe({
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			next: () => {},
			error: () => {
				expect(spy).toHaveBeenCalledOnceWith(showSnakeBar());
			},
		});
	});
});
