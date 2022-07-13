import { HttpResponseIntercepter } from './../intercepters/http-intercepters/http-response-intercepter';
import { TokenInterceptor } from './http-intercepters/token-interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";



export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpResponseIntercepter, multi: true },
];