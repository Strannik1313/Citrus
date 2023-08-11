import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { MockInitialState, MockUserDto } from '@tests/mock-constants';
import { TokenInterceptor } from '@interceptors/token.interceptor';
import { AuthService } from '@api/AuthService';
import { MockAuthService, MockHttpHandler, MockHttpRequest, MockHttpResponseWithoutToken } from '@tests/mock-services';
import { UserDto } from '@models/UserDto';
import { cold } from 'jasmine-marbles';

describe('TokenInterceptor', () => {
	let interceptor: TokenInterceptor;

	let mockRequest: HttpRequest<unknown>;
	let mockHandler: HttpHandler;

	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpHandler,
					useValue: MockHttpHandler,
				},
				{
					provide: HttpRequest,
					useValue: MockHttpRequest,
				},
				{
					provide: AuthService,
					useValue: MockAuthService,
				},
				TokenInterceptor,
			],
		}),
	);

	beforeEach(() => {
		interceptor = TestBed.inject(TokenInterceptor);
		mockRequest = TestBed.inject(HttpRequest);
		mockHandler = TestBed.inject(HttpHandler);
	});

	it('should be created', () => {
		expect(interceptor).toBeTruthy();
	});

	it('response contain only user without accept token', () => {
		const expected = cold('(a|)', {
			a: MockHttpResponseWithoutToken,
		});
		expect(interceptor.intercept(mockRequest, mockHandler)).toBeObservable(expected);
	});

	it('repeat request after setting token on error request', () => {
		const expected = cold('(a|)', {
			a: MockHttpResponseWithoutToken,
		});
		expect(interceptor.intercept(mockRequest, mockHandler)).toBeObservable(expected);
	});
});
