import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ClientData } from '../interfaces/client-data';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonStatusService {
  private clientData: ClientData = new ClientData
  constructor(
    private storage: StorageService,
    private route: Router
  ) {
    this.storage.clientData$.subscribe(
      (data) => {
        this.clientData = data
      }
    )
  }

  setButtonStatus(): void {
    switch (this.route.routerState.snapshot.url) {
      case '': {
        this.storage.activateButton()
        break
      }
      case '/crossroad': {
        this.storage.activateButton()
        break
      }
      case '/spec-choice': {
        if (this.clientData.master == '') {
          this.storage.disableButton()
        } else {
          this.storage.activateButton()
        }
        break
      }
      case '/service-choice': {
        if (!this.clientData.service) {
          this.storage.disableButton()
        } else {
          this.storage.activateButton()
        }
        break
      }
      case '/date-choice': {
        if (this.clientData.time.hour == 0) {
          this.storage.disableButton()
        } else {
          this.storage.activateButton()
        }
        break
      }
    }
  }
  setButtonSubject(url: string): Observable<boolean> {
    switch (url) {
      case '/..':{
        return this.storage.backButtonDisabled$
      }
      case '/login':{
        return this.storage.authButtonActive$
      }
      case '/register':{
        return this.storage.authButtonActive$
      }
      case '/account':{
        return this.storage.authButtonActive$
      }
      default:
        return this.storage.buttonStatus$;
    }
    // if (url == '/..') {
    //   return this.storage.backButtonDisabled$
    // } else {
    //   return this.storage.buttonStatus$
    // }
  }
}
