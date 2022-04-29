import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AccessMap } from '../models/access-map';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavigateAccess implements CanActivate, OnDestroy {
  subscription: Subscription
  accessMap: AccessMap = new AccessMap
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    switch (state.url)  {
      case '/login': {
        if (!this.accessMap.loginPage) {
          this.route.navigate(['/']);
        }
        return this.accessMap.loginPage
      }
      case '/account': {
        if (!this.accessMap.accountPage) {
          this.route.navigate(['/']);
        }
        return this.accessMap.accountPage
      }
      case '/register': {
        if (!this.accessMap.registerPage) {
          this.route.navigate(['/']);
        }
        return this.accessMap.registerPage
      }
      case '/crossroad': {
        if (!this.accessMap.crossroadPage) {
          this.route.navigate(['/']);
        }
      return this.accessMap.crossroadPage}

      case '/spec-choice': {
        if (!this.accessMap.specChoicePage) {
          this.route.navigate(['/']);
        }
        return this.accessMap.specChoicePage
      }
      case '/service-choice': {
        if (!this.accessMap.serviceChoicePage) {
          this.route.navigate(['/']);
        }
        return this.accessMap.serviceChoicePage
      }
      case '/date-choice': {
        if (!this.accessMap.dateChoicePage) {
          this.route.navigate(['/']);
        }
        return this.accessMap.dateChoicePage
      }
      case '/confirm-page': {
        if (!this.accessMap.confirmPage) {
          this.route.navigate(['/']);
        }
        return this.accessMap.confirmPage
      }
      default: return false
    }
    
    
  }


  constructor(
    private route: Router,
    private storage: StorageService
  ) {
    
    this.subscription = this.storage.accessMap$.subscribe(data => this.accessMap = data)
  }

  ngOnDestroy(): void {
  }
}
