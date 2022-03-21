import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteService } from 'src/app/services/route.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-app-button-wrapper',
  templateUrl: './app-button-wrapper.component.html',
  styleUrls: ['./app-button-wrapper.component.scss']
})
export class AppButtonWrapperComponent implements OnInit, OnDestroy {
  @Input() label: string = ''
  @Input() url: string = ''
  @Input() buttonId: string = ''
  isDisabled: boolean = false
  subscription: Subscription
  constructor(
    private storage: StorageService,
    public routeWithUrl: RouteService
  ) {

    this.subscription = this.storage.buttonStatus$.subscribe(data => this.isDisabled = data)


  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  goToNextPage(url: string): void {

  }
  setBackButtonStatus(url: string): boolean {
    if (this.url == '/..') {
      this.storage.setButtonStatus()
      return this.isDisabled
    }
    return false
  }
}
