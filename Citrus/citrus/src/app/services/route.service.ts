import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  subscription: Subscription
  
  private currentUrl: Array<string> = []

  constructor(
    private storage: StorageService,
    private route: Router

  ) {
    this.subscription = this.storage.roadMapUrls$.subscribe(data => this.currentUrl = data)
  
  }



  goToNextPage(url: string): void {
    if (url == '/..') {
      this.goToPreviousPage(url)
    } else {
      this.storage.setRoadMap(url)
      this.route.navigate([url])
    }
  }
  goToPreviousPage(url: string): void {
    // console.log(this.currentUrl[this.currentUrl.length-1])
    this.storage.setRoadMap(url)
     this.route.navigate([this.currentUrl[this.currentUrl.length-1]])
    //  console.log(this.currentUrl[this.currentUrl.length-2])
  }
}
