import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap, timer } from 'rxjs';
import { SPINNER_TIME } from 'src/app/InjectionsToken/InjectionToken';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class SpinnerActivator implements HttpInterceptor {
  private subscription: Subscription = new Subscription;
  constructor(
    @Inject(SPINNER_TIME) private spinnerTime: number,
    private storage: StorageService
  ) { };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.storage.setInitializeStatus(true);
    let isTime: boolean = false;
    let isResponse: boolean = false;
    this.subscription = timer(this.spinnerTime).subscribe(() => {
      if (isResponse) {
        this.storage.setInitializeStatus(false);
        this.subscription.unsubscribe();
      } else {
        isTime = true;
      };
    });
    return next.handle(req).pipe(
      tap({
        error: () => {
            this.storage.setInitializeStatus(false);
            this.subscription.unsubscribe();
        },
        complete: () => {
        if (isTime) {
          this.storage.setInitializeStatus(false);
          this.subscription.unsubscribe();
        } else {
          isResponse = true;
        };
      }})
    );
  };
}
