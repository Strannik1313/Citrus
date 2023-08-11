import { of, throwError } from 'rxjs';
import { mockRouterUrl, MockUserDto } from '@tests/mock-constants';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';

export const MockAuthService = {
	login() {
		return of(MockUserDto);
	},
	register() {
		return of(undefined);
	},
	logout() {
		return of(undefined);
	},
	refreshTokens() {
		return of('mockToken');
	},
	currentUser() {
		return of(MockUserDto);
	},
};

export const MockRouter = {
	routerState: { snapshot: { url: '' } },
	navigate() {
		return undefined;
	},
	url: mockRouterUrl,
};

export const MockHttpResponseError = throwError(() => new HttpErrorResponse({ status: 401, url: '/mock' }));

export const MockHttpResponse = new HttpResponse({
	url: '/api/auth/login',
	body: { user: MockUserDto, acceptToken: 'mockToken' },
});

export const MockHttpResponseWithoutToken = new HttpResponse({
	url: '/api/auth/login',
	body: { ...MockUserDto },
});

export const MockHttpHandlerWithError = {
	handle: (request: HttpRequest<unknown>) => MockHttpResponseError,
};

export const MockHttpHandler = {
	handle: (request: HttpRequest<unknown>) => of(MockHttpResponse),
};

export const MockHttpRequest = {
	context: {
		get: () => false,
	},
	clone: (update: unknown) => MockHttpRequestWithAuthorizationHeader,
};

export const MockHttpRequestWithAuthorizationHeader = {
	...MockHttpRequest,
	headers: 'mockHeaders',
};
