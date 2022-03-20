import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessCart } from '../interfaces/access-cart';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roadMapSubject: BehaviorSubject<string[]> = new BehaviorSubject([''])
  private isButtonDisabled: BehaviorSubject<AccessCart> = new BehaviorSubject<AccessCart>({
    mainPage: true,
    loginPage: true,
    crossroadPage: true,
    specChoicePage: false,
    serviceChoicePage: false,
    dateChoicePage: false,
    confirmPage: false,
    backButton: false
  })

  private _tempArray: Array<string> = ['/']
  private _tempButtonCart: AccessCart = {
    mainPage: true,
    loginPage: true,
    crossroadPage: true,
    specChoicePage: true,
    serviceChoicePage: true,
    dateChoicePage: false,
    confirmPage: false,
    backButton: false
  }

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
  setButtonStatus(buttonId: string): void {
    switch (buttonId) {
      case 'mainPage': {
        this._tempButtonCart = {
          ...this._tempButtonCart,
          mainPage: true,
          backButton: false
        }
        this.isButtonDisabled.next(this._tempButtonCart)
        break
      }
      case 'loginPage': {
        this._tempButtonCart = {
          ...this._tempButtonCart,
          loginPage: true,
          backButton: true
        }
        this.isButtonDisabled.next(this._tempButtonCart)
        break
      }
      case 'crossroadPage': {
        this._tempButtonCart = {
          ...this._tempButtonCart,
          crossroadPage: true,
          backButton: true
        }
        this.isButtonDisabled.next(this._tempButtonCart)
        break
      }
      case 'specChoicePage': {
        this._tempButtonCart = {
          ...this._tempButtonCart,
          specChoicePage: true,
          backButton: true
        }
        this.isButtonDisabled.next(this._tempButtonCart)
        break
      }
      case 'serviceChoicePage': {
        this._tempButtonCart = {
          ...this._tempButtonCart,
          serviceChoicePage: true,
          backButton: true
        }
        this.isButtonDisabled.next(this._tempButtonCart)
        break
      }
      case 'dateChoicePage': {
        this._tempButtonCart = {
          ...this._tempButtonCart,
          dateChoicePage: true,
          backButton: true
        }
        this.isButtonDisabled.next(this._tempButtonCart)
        break
      }
      case 'confirmPage': {
        this._tempButtonCart = {
          ...this._tempButtonCart,
          confirmPage: true,
          backButton: true
        }
        this.isButtonDisabled.next(this._tempButtonCart)
        break
      }
      case 'backButton': {
        if (this._tempArray.length == 1) {
          this._tempButtonCart = {
            ...this._tempButtonCart,
            backButton: false
          }
          this.isButtonDisabled.next(this._tempButtonCart)
          break
        } else {
          this._tempButtonCart = {
            ...this._tempButtonCart,
            backButton: true
          }
          this.isButtonDisabled.next(this._tempButtonCart)
        }

        break
      }
    }

  }

  constructor() { }

}
