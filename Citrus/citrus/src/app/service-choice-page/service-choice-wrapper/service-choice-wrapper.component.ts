import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ClientData } from 'src/app/interfaces/client-data';
import { MasterData } from 'src/app/interfaces/master-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-service-choice-wrapper',
  templateUrl: './service-choice-wrapper.component.html',
  styleUrls: ['./service-choice-wrapper.component.scss']
})
export class ServiceChoiceWrapperComponent implements OnInit, OnDestroy {
  masterData: MasterData[] = [{
    name: '',
    services: [''],
    id: ''
  }]
  clientData: ClientData = {
    master: '',
    masterId: '',
    services: [''],
    date: '',
    name: '',
    surname: '',
    phoneNumber: '',
    comments: ''
  }
  subscriptionMasterData: Subscription
  subscriptionClientData: Subscription
  constructor(
    private http: HttpService,
    private storage: StorageService
  ) {
    this.subscriptionClientData = this.storage.clientData$.subscribe(data => this.clientData = data)
    this.subscriptionMasterData = this.http.getMasterData().subscribe((data) => {
      if (this.clientData.masterId) {
        this.masterData = data.filter((m) => {
          return m.id == this.clientData.masterId
        })
      } else {
        this.masterData = data
      }
      console.log(this.masterData)
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptionClientData.unsubscribe()
    this.subscriptionMasterData.unsubscribe()
  }
}
