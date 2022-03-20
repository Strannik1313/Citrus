import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessCart } from 'src/app/interfaces/access-cart';
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
    this.subscription = this.storage.buttonStatus$.subscribe(data => this.isDisabled = data[this.buttonId])
  }

  ngOnInit(): void {
    this.storage.setButtonStatus(this.buttonId)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  goToNextPage(url: string): void {

  }
}
