import { TestBed } from '@angular/core/testing';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { showSnakeBar } from '@state-management/main-feature/main.actions';
import { MockInitialState } from '@tests/mock-constants';
import { MockHttpHandlerWithError, MockHttpRequest } from '@tests/mock-services';

describe('ErrorHandlerInterceptor', () => {
	let store: MockStore;
	let interceptor: ErrorHandlerInterceptor;

	let mockRequest: HttpRequest<unknown>;
	let mockHandler: HttpHandler;

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpHandler,
					useValue: MockHttpHandlerWithError,
				},
				{
					provide: HttpRequest,
					useValue: MockHttpRequest,
				},
				ErrorHandlerInterceptor,
				provideMockStore({ initialState: MockInitialState }),
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
		const spy = spyOn(store, 'dispatch');
		interceptor.intercept(mockRequest, mockHandler).subscribe({
			error: () => {
				expect(spy).toHaveBeenCalledOnceWith(showSnakeBar());
			},
		});
	});

	it('dont dispatch showSnakeBar action after error is thrown if suppressEvent is true', () => {
		const spy = spyOn(store, 'dispatch');
		spyOn(mockRequest.context, 'get').and.returnValue(true);
		interceptor.intercept(mockRequest, mockHandler).subscribe({
			error: () => {
				expect(spy).not.toHaveBeenCalled();
			},
		});
	});
});
