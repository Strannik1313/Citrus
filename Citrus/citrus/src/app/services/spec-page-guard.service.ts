import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccessMap } from '../interfaces/access-map';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SpecPageGuard implements CanActivate {
  subscription: Subscription
  accessMap: AccessMap = {
    mainPage: true,
    crossroadPage: false,
    specChoicePage: false,
    serviceChoicePage: false,
    dateChoicePage: false,
    confirmPage: false
}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    switch (state.url){
      case '/crossroad': return this.accessMap.crossroadPage
      case '/specChoice': return this.accessMap.specChoicePage
      case '/serviceChoice': return this.accessMap.serviceChoicePage
      case '/dateChoice': return this.accessMap.dateChoicePage
      case '/confirm': return this.accessMap.confirmPage
      default: return false
    }
    
    
  }


  constructor(
    private http: HttpService,
    private storage: StorageService
  ) {
    
    this.subscription = this.storage.accessMap$.subscribe(data => this.accessMap = data)
  }
}
