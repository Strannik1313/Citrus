import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { ClientData } from 'src/app/models/client-data';
import { MasterData } from 'src/app/interfaces/master-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-spec-choice-wrapper',
  templateUrl: './spec-choice-wrapper.component.html',
  styleUrls: ['./spec-choice-wrapper.component.scss']
})

export class SpecChoiceWrapperComponent implements OnInit, OnDestroy {
  public masterData: MasterData[] = [];
  public clientData: ClientData = new ClientData;
  public shouldClientDataBeSaved: boolean = false;
  private subscritions: Subscription[] = [];
  selectedOption: number = 0;

  constructor(
    private http: HttpService,
    private storage: StorageService
  ) {
    this.subscritions.push(this.http?.getMasterData()?.subscribe((data) => {
      this.masterData = data;
    }));
    this.subscritions.push(this.storage?.clientData$?.subscribe((data) => {
      this.clientData = data;
    }));
    this.subscritions.push(this.storage?.shouldClientDataSaved$?.subscribe((data) => {
      this.shouldClientDataBeSaved = data;
    }));
  }

  ngOnInit(): void {
    if (!!this.clientData.masterId) {
      this.selectedOption = this.clientData.masterId;
    };
  };

  ngOnDestroy(): void {
    if (!this.shouldClientDataBeSaved) {
      this.storage.setClientData({
        name: 'master',
        value: '',
        id: '',
        masterChoiceToogle: false
      });
    }
    this.subscritions.forEach(sub => sub.unsubscribe());
  };

  updateChoisenMaster(e: MatSelectionListChange): void {
    this.storage.setClientData({
      name: 'master',
      value: e.source.selectedOptions.selected[0].value.name,
      id: e.source.selectedOptions.selected[0].value.id,
      masterChoiceToogle: true
    });
  };
}
