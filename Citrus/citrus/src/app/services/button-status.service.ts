import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonStatusService {

  constructor(
    private storage: StorageService,
    private route: Router
  ) { }
    
  setButtonStatus(): void {
    console.log(this.route.routerState.snapshot.url)
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
        this.storage.disableButton()
        break
      }
      case '/service-choice': {
        this.storage.disableButton()
        break
      }
      case '/date-choice': {
        this.storage.disableButton()
        break
      }
    }
  }
  setButtonSubject(url: string): Observable<boolean> {
    if (url == '/..') {
      return this.storage.backButtonDisabled$
    } else {
      return this.storage.buttonStatus$
    }
  }
}
