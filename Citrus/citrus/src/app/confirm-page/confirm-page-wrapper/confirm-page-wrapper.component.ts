import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientData } from 'src/app/interfaces/client-data';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-confirm-page-wrapper',
  templateUrl: './confirm-page-wrapper.component.html',
  styleUrls: ['./confirm-page-wrapper.component.scss']
})
export class ConfirmPageWrapperComponent implements OnInit, OnDestroy {
  subscriptionClientData: Subscription
  clientData: ClientData = {
    master: '',
    masterId: 0,
    services: [],
    date: new Date,
    time: {
      hour: 0,
      minute: 0
    },
    name: '',
    surname: '',
    phoneNumber: '',
    comments: ''
  }
  constructor(
    private storage: StorageService
  ) { 
    this.subscriptionClientData = this.storage.clientData$.subscribe(data => this.clientData = data)
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptionClientData.unsubscribe()
  }

}
