import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessMap } from '../models/access-map';
import { ClientData } from '../models/client-data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roadMapSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['']);
  private isResponseError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private haveAccountData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isTokenValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authButtonActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isClientDataShouldSaved: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private isBackButtonDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private accessMap: BehaviorSubject<AccessMap> = new BehaviorSubject<AccessMap>(new AccessMap);
  private clientData: BehaviorSubject<ClientData> = new BehaviorSubject<ClientData>(new ClientData);
  private authorizedUserData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _tempArray: Array<string> = ['/'];

  roadMapUrls$: Observable<string[]> = this.roadMapSubject.asObservable();
  isResponseError$: Observable<boolean> = this.isResponseError.asObservable();
  buttonStatus$: Observable<boolean> = this.isButtonDisabled.asObservable();
  haveAccountData$: Observable<boolean> = this.haveAccountData.asObservable();
  isTokenValid$: Observable<boolean> = this.isTokenValid.asObservable();
  isAdmin$: Observable<boolean> = this.isAdmin.asObservable();
  authButtonActive$: Observable<boolean> = this.authButtonActive.asObservable();
  shouldClientDataSaved$: Observable<boolean> = this.isClientDataShouldSaved.asObservable();
  backButtonDisabled$: Observable<boolean> = this.isBackButtonDisabled.asObservable();
  accessMap$: Observable<AccessMap> = this.accessMap.asObservable();
  clientData$: Observable<ClientData> = this.clientData.asObservable();
  authorizedUserData$: Observable<any> = this.authorizedUserData.asObservable();

  setRoadMap(newValue: string) {
    if (newValue == '/..') {
      this._tempArray.pop();
      this.roadMapSubject.next(this._tempArray);
    } else {
      if (newValue == 'clear') {
        this.roadMapSubject.next(['']);
        this._tempArray = [''];
      } else {
        if (this._tempArray.find(a => a == newValue) == undefined) {
          this._tempArray.push(newValue);
          this.roadMapSubject.next(this._tempArray);
        };
      };
    };
  };

  activateButton(): void {
    this.isButtonDisabled.next(false);
  };

  disableButton(): void {
    this.isButtonDisabled.next(true);
  };

  setBackButtonStatus(): void {
    if (this._tempArray.length == 1) {
      this.isBackButtonDisabled.next(true);
    } else {
      this.isBackButtonDisabled.next(false);
    };
  };

  setAccessMap(url: string): void {
    switch (url) {
      case '/': {
        this.accessMap.next({
          ...this.accessMap.value,
          loginPage: true,
          registerPage: true,
          accountPage: false,
          adminPage: false
        });
        break;
      };
      case '/admin': {
        if (this.isAdmin.value) {
          this.accessMap.next({
            ...this.accessMap.value,
            loginPage: true,
            registerPage: true,
            accountPage: false,
            adminPage: true
          });
        } else {
          this.accessMap.next({
            ...this.accessMap.value,
            loginPage: true,
            registerPage: true,
            accountPage: false,
            adminPage: false
          });
        };
        break;
      };
      case '/account': {
        this.accessMap.next({
          ...this.accessMap.value,
          loginPage: true,
          registerPage: true,
          accountPage: true,
          adminPage: false
        });
        break;
      };
      case '/crossroad': {
        this.accessMap.next({
          ...this.accessMap.value,
          crossroadPage: true
        });
        break;
      };
      case '/spec-choice': {
        this.accessMap.next({
          ...this.accessMap.value,
          specChoicePage: true,
        });
        break;
      };
      case '/service-choice': {
        this.accessMap.next({
          ...this.accessMap.value,
          serviceChoicePage: true
        });
        break;
      };
      case '/date-choice': {
        this.accessMap.next({
          ...this.accessMap.value,
          dateChoicePage: true
        });
        break;
      };
      case '/confirm-page': {
        this.accessMap.next({
          ...this.accessMap.value,
          confirmPage: true
        });
        break;
      };
    };
  };

  setClientData(action: any): void {
    switch (action.name) {
      case 'master': {
        this.clientData.next({
          ...this.clientData.value,
          master: action.value,
          masterId: action.id,
          masterWasSelected: action.masterChoiceToogle
        });
        this.activateButton();
        break;
      };
      case 'services': {
        this.clientData.next({
          ...this.clientData.value,
          service: action.value
        });
        if (action.value) {
          this.activateButton();
        } else {
          this.disableButton();
        };
        break;
      };
      case 'calendar': {
        this.clientData.next({
          ...this.clientData.value,
          masterId: action.id,
          master: action.masterName,
          date: action.date,
          time: {
            hour: action.hour,
            minute: action.minute
          }
        });
        if (action.masterName) {
          this.activateButton();
        } else {
          this.disableButton();
        };
        break;
      };
      case 'confirm': {
        this.clientData.next({
          ...this.clientData.value,
          name: action.clientName,
          surname: action.clientSurname,
          phoneNumber: action.phoneNumber,
          comments: action.comments ? action.comments : ''
        });
        break;
      };
      case 'admin': {
        this.clientData.next({
          ...this.clientData.value,
          master: action.master,
          masterId: action.masterId,
          masterWasSelected: action.masterWasSelected,
          service: action.service,
          name: action.clientName,
          surname: action.clientSurname,
          phoneNumber: action.phoneNumber,
          comments: action.comments ? action.comments : ''
        });
        break;
      };
    };
  };

  setClientDataSaved(value: boolean): void {
    this.isClientDataShouldSaved.next(value);
  };

  setAuthorizedUserData(data: any): void {
    this.authorizedUserData.next({
      ...data
    });
  };

  setHaveAccountFormData(data: boolean): void {
    this.haveAccountData.next(data);
  };

  setIsTokenValid(value: boolean): void {
    this.isTokenValid.next(value);
  };

  setIsAdmin(value: boolean): void {
    this.isAdmin.next(value);
  };
  setIsResponseError(value: boolean): void {
    this.isResponseError.next(value)
  }
}
