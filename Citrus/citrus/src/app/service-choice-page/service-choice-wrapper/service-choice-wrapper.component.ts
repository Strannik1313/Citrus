import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
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
  shouldClientDataBeSaved: boolean = false
  services: Array<string> = []
  preSelectionServices: Array<string> = []
  masterData: MasterData[] = [{
    name: '',
    services: [],
    id: 0
  }]
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
  subscriptionMasterData: Subscription
  subscriptionClientData: Subscription
  subscriptionShouldClientDataBeSaved: Subscription
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
      for (let i = 0; i < this.masterData.length; i++) {
        for (let y = 0; y < this.masterData[i].services.length; y++) {
          if (this.services.find(a => a == this.masterData[i].services[y]) == undefined) {
            this.services.push(this.masterData[i].services[y])
          }
        }
      }
      if (this.clientData.services.length > 0) {
        this.preSelectionServices = this.clientData.services
      }
    })
    this.subscriptionShouldClientDataBeSaved = this.storage.shouldClientDataSaved$.subscribe((data) => {
      this.shouldClientDataBeSaved = data
    })

  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    if (!this.shouldClientDataBeSaved) {
      this.storage.setClientData({
        name: 'services',
        value: []
      })
    }
    this.subscriptionShouldClientDataBeSaved.unsubscribe()
    this.subscriptionClientData.unsubscribe()
    this.subscriptionMasterData.unsubscribe()
  }
  updateChoisenServices(e: MatSelectChange): void {
    this.storage.setClientData({
      name: 'services',
      value: e.value
    })
  }
}
