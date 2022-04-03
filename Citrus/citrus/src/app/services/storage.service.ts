import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessMap } from '../interfaces/access-map';
import { ClientData } from '../interfaces/client-data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roadMapSubject: BehaviorSubject<string[]> = new BehaviorSubject([''])
  private isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private isBackButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  private accessMap: BehaviorSubject<AccessMap> = new BehaviorSubject<AccessMap>({
    mainPage: true,
    crossroadPage: false,
    specChoicePage: false,
    serviceChoicePage: false,
    dateChoicePage: false,
    confirmPage: false
  })
  private clientData: BehaviorSubject<ClientData> = new BehaviorSubject<ClientData>({
    master: '',
    masterId: '',
    services: [''],
    date: '',
    name: '',
    surname: '',
    phoneNumber: '',
    comments: ''
  })

  private _tempArray: Array<string> = ['/']


  roadMapUrls$: Observable<string[]> = this.roadMapSubject.asObservable()
  buttonStatus$: Observable<boolean> = this.isButtonDisabled.asObservable()
  backButtonDisabled$: Observable<boolean> = this.isBackButtonDisabled.asObservable()
  accessMap$: Observable<AccessMap> = this.accessMap.asObservable()
  clientData$: Observable<ClientData> = this.clientData.asObservable()

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
  activateButton(): void {
    this.isButtonDisabled.next(false) 
  }
  disableButton(): void {
    this.isButtonDisabled.next(true) 
  }
  setBackButtonStatus(): void {
    if (this._tempArray.length == 1) {
      this.isBackButtonDisabled.next(true)
    } else {
      this.isBackButtonDisabled.next(false)
    }
  }
  setAccessMap(url: string): void {
    switch (url) {
      case '/crossroad': {
        this.accessMap.next({
          ...this.accessMap.value,
          crossroadPage: true
        })
        break
      }
      case '/spec-choice': {
        this.accessMap.next({
          ...this.accessMap.value,
          specChoicePage: true,
        })
        break
      }
      case '/service-choice': {
        this.accessMap.next({
          ...this.accessMap.value,
          serviceChoicePage: true
        })
        break
      }
      case '/date-choice': {
        this.accessMap.next({
          ...this.accessMap.value,
          dateChoicePage: true
        })
        break
      }
      case '/confirm-page': {
        this.accessMap.next({
          mainPage: true,
          crossroadPage: true,
          specChoicePage: true,
          serviceChoicePage: true,
          dateChoicePage: true,
          confirmPage: true
        })
        break
      }

    }

  }
  setClientData(action: any): void {
    switch (action.name) {
      case 'master': {
        this.clientData.next({
          ...this.clientData.value,
          master: action.value,
          masterId: action.id
        })
        this.activateButton()
        break
      }
    }

  }
  removeDataFromCurrentPage(url: string): void {
    switch (url) {
    }
  }


  constructor() { }

}
