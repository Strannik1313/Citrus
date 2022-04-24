import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizedClientData } from 'src/app/interfaces/authorized-client-data';
import { ClientData } from 'src/app/interfaces/client-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubmitData } from './confirm-layout/confirm-layout.component';

@Component({
  selector: 'app-confirm-page-wrapper',
  templateUrl: './confirm-page-wrapper.component.html',
  styleUrls: ['./confirm-page-wrapper.component.scss']
})
export class ConfirmPageWrapperComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  haveAccountData: boolean = false
  authorizedClientData: AuthorizedClientData = new AuthorizedClientData
  clientData: ClientData = new ClientData
  constructor(
    private storage: StorageService,
    private http: HttpService
  ) {
    this.subscriptions.push(this.storage.clientData$.subscribe(data => this.clientData = data))
    this.subscriptions.push(this.storage.authorizedUserData$.subscribe(data => {
      this.authorizedClientData = data
    }))
    this.subscriptions.push(this.storage.haveAccountData$.subscribe(data => {
      this.haveAccountData = data
    }))
    this.subscriptions.push(this.storage.haveAccountData$.subscribe(data => {
      this.haveAccountData = data
    }))
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
  formValue(e: SubmitData) {
    this.storage.setClientData({
      name: 'confirm',
      clientName: e.clientName,
      clientSurname: e.clientLastname,
      phoneNumber: e.phoneNumber,
      comment: e.comments
    })
    this.subscriptions.push(this.http.makeOrder(this.clientData).subscribe(data => {
      
    }))
  }
}
