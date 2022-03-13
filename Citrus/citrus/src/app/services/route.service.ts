import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private currentUrl: string = ''

  constructor(private route: Router) { }

  private _setCurrentUrl(curUrl: string): void {
    this.currentUrl = curUrl
  }

  goToNextPage(url: string): any {
    this._setCurrentUrl(this.route.routerState.snapshot.url)
    this.route.navigate([url])
  }
}
