import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private http: HttpService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.http.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.http.getToken()
        }
      })
    }
    return next.handle(req)
  }
}
