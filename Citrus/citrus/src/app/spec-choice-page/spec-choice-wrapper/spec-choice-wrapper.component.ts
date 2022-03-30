import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { ClientData } from 'src/app/interfaces/client-data';
import { MasterData } from 'src/app/interfaces/master-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-spec-choice-wrapper',
  templateUrl: './spec-choice-wrapper.component.html',
  styleUrls: ['./spec-choice-wrapper.component.scss']
})
export class SpecChoiceWrapperComponent implements OnInit, OnDestroy {
  public masterData: MasterData[] = []
  public clientData: ClientData = {
    master: '',
    masterId: '',
    services: '',
    date: '',
    name: '',
    surname: '',
    phoneNumber: '',
    comments: ''
  }
  subscriptionMasterData: Subscription
  subscriptionClientData: Subscription
  selectedOption: string = ''
  isInitialize: boolean = false
  constructor(
    private http: HttpService,
    private storage: StorageService
  ) {
    this.subscriptionMasterData = this.http.getMasterData().subscribe((data) => {
      this.masterData = data
      this.isInitialize = true
    })
    this.subscriptionClientData = this.storage.clientData$.subscribe((data) => {
      this.clientData = data
    })
   }

  ngOnInit(): void {
    if (!!this.clientData.masterId) {
      this.selectedOption = this.clientData.masterId
    }
  }

  ngOnDestroy():void {
    this.subscriptionMasterData.unsubscribe()
    this.subscriptionClientData.unsubscribe()
  }
  updateChoisenMaster(e: MatSelectionListChange):void {
    this.storage.setClientData({
      name: 'master',
      value: e.source.selectedOptions.selected[0].value.name,
      id: e.source.selectedOptions.selected[0].value.id
    })
  }
}
