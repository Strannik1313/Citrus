import { ServerErrorHandleService } from './../../services/server-error-handle.service';
import { finalize, Observable, retry, tap } from 'rxjs';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpRequest, HttpContext, HttpContextToken, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpResponseIntercepter implements HttpInterceptor {

  constructor(
    private serverErrorHandler: ServerErrorHandleService
   ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      tap({
        next: (event) => {
          this.serverErrorHandler.setIsServerError(false);
        },
        error: (error) => {
          this.serverErrorHandler.setIsServerError(true);
          this.serverErrorHandler.setErrorInstance(error);
        }
      }),
      finalize(() => {
      })
    );
  };
}
