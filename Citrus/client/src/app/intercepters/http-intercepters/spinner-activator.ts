import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { combineLatestAll, delayWhen, finalize, Observable, take, takeUntil, tap, timer, timestamp } from 'rxjs';
import { SPINNER_TIME } from 'src/app/InjectionsToken/InjectionToken';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class SpinnerActivator implements HttpInterceptor {
  constructor(
    @Inject(SPINNER_TIME) private spinnerTime: number,
    private storage: StorageService
  ) { };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.storage.setInitializeStatus(true);
    return next.handle(req).pipe(
      delayWhen(()=> timer(this.spinnerTime).pipe(take(1), finalize(()=>{console.log(new Date().getMilliseconds())}))),
      finalize(()=> {
          this.storage.setInitializeStatus(false);
        })
    );
  };
}
