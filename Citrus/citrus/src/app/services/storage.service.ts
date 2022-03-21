import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessMap } from '../interfaces/access-map';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roadMapSubject: BehaviorSubject<string[]> = new BehaviorSubject([''])
  private isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private accessMap: BehaviorSubject<AccessMap> = new BehaviorSubject<AccessMap>({
      mainPage: true,
      crossroadPage: true,
      specChoicePage: false,
      serviceChoicePage: false,
      dateChoicePage: false,
      confirmPage: false
  })

  private _tempArray: Array<string> = ['/']


  roadMapUrls$: Observable<any> = this.roadMapSubject.asObservable()
  buttonStatus$: Observable<any> = this.isButtonDisabled.asObservable()
  accessMap$: Observable<any> = this.accessMap.asObservable()

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

  constructor() { }

}
