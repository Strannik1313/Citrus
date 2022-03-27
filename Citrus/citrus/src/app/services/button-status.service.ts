import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonStatusService {

  constructor(
    private storage: StorageService
  ) { }
  setButtonStatus(url: string): Observable<boolean> {
    if (url == '/..') {
      return this.storage.backButtonDisabled$
    } else {
      return this.storage.buttonStatus$
    }
  }
}
