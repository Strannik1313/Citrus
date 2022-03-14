import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RouteService } from 'src/app/services/route.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-custom-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent implements OnInit {

  @Input() name: string = ''
  @Input() url: string = ''
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
  buttonStatus(name: string): boolean {
    if (name == 'Back') {
      this.storage.setButtonStatus()
      return this.isDisabled
    }
    return false
  }


}
