import { HttpResponseIntercepter } from './../intercepters/http-intercepters/http-response-intercepter';
import { TokenInterceptor } from './http-intercepters/token-interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { SpinnerActivator } from './http-intercepters/spinner-activator';



export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerActivator, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpResponseIntercepter, multi: true },
];