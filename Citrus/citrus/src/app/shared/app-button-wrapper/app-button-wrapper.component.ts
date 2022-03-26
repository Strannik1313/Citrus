import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteService } from 'src/app/services/route.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-app-button-wrapper',
  templateUrl: './app-button-wrapper.component.html',
  styleUrls: ['./app-button-wrapper.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
    this.subscription = this.storage.backButtonDisabled$.subscribe(data => this.isDisabled = data)
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  setBackButtonStatus(url: string): boolean {
    if (this.url == '/..') {
      this.storage.setBackButtonStatus()
      return this.isDisabled
    }
    return false
  }
}
