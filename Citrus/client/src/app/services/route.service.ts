import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private subscription: Subscription;
  private currentUrl: Array<string> = [];

  constructor(
    private storage: StorageService,
    private route: Router
  ) {
    this.subscription = this.storage?.roadMapUrls$?.subscribe(data => this.currentUrl = data);
  };

  goToNextPage(url: string): void {
    switch (url) {
      case '/..': {
        this.goToPreviousPage(url);
        break;
      };
      case '/home': {
        this.storage?.setRoadMap('clear');
        this.storage?.setAccessMap('/');
        this.route?.navigate(['/']);
        this.storage?.setBackButtonStatus();
        this.storage?.setClientDataSaved(false);
        break;
      };
      default: {
        this.storage?.setRoadMap(url);
        this.storage?.setAccessMap(url);
        this.route?.navigate([url]);
        this.storage?.setBackButtonStatus();
        this.storage?.setClientDataSaved(true);
      };
        break;
    };
  }

  goToPreviousPage(url: string): void {
    this.storage?.setRoadMap(url);
    this.route?.navigate([this.currentUrl[this.currentUrl.length - 1]]);
    this.storage?.setBackButtonStatus();
    this.storage?.setClientDataSaved(false);
  };
}
