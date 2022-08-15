import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseIntercepter } from '@intercepters/http-intercepters/http-response-intercepter';
import { SpinnerActivator } from '@intercepters/http-intercepters/spinner-activator';
import { TokenInterceptor } from '@intercepters/http-intercepters/token-interceptor';

export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: SpinnerActivator, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	{
		provide: HTTP_INTERCEPTORS,
		useClass: HttpResponseIntercepter,
		multi: true,
	},
];
