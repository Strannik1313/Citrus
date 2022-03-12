import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private currentUrl: string = ''
  
  constructor(private route: Router) { }

  private _getUrl(): string {
    return '/service-choice'
  }

  private _setUrl(url: string): void {
    this.currentUrl = url
  }

  goToNextpage(url:string): any {
    this._setUrl(url)
    this.route.navigate([this._getUrl()])
    console.log(this.currentUrl)
  }
}
