import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roadMapSubject: BehaviorSubject<string[]> = new BehaviorSubject([''])
  private isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  private _tempArray: Array<string> = ['/']
  
  roadMapUrls$: Observable<any> = this.roadMapSubject.asObservable()
  buttonStatus$: Observable<any> = this.isButtonDisabled.asObservable()

  setRoadMap(newValue: string) {
    if (newValue == '/..') {
      this._tempArray.pop()
      this.roadMapSubject.next(this._tempArray)
    } else {
      if (this._tempArray.find(a => a == newValue) == undefined) {
        this._tempArray.push(newValue)
        this.roadMapSubject.next(this._tempArray)
      }
    }
  }
  setButtonStatus(): void {
    if (this._tempArray.length == 1) {
      this.isButtonDisabled.next(true)
    } else {
      this.isButtonDisabled.next(false)
    }
  }

  constructor() {}

}
