import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header-wrapper',
  templateUrl: './header-wrapper.component.html',
  styleUrls: ['./header-wrapper.component.scss']
})
export class HeaderWrapperComponent implements OnInit, OnDestroy {
  
  subscription: Subscription
  isAuthorized: boolean = false

  constructor(
    private storage: StorageService
  ) {
    this.subscription = this.storage.isTokenValid$.subscribe(data => {
      this.isAuthorized = data
    })
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
