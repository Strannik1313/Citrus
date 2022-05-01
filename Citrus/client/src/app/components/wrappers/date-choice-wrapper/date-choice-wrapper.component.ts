import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChoisenTime } from 'src/app/interfaces/choisen-time';
import { ClientData } from 'src/app/models/client-data';
import { StudioData } from 'src/app/interfaces/studio-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { CustomCalendarHeader } from '../../ui/date-choice-ui/custom-calendar-header/custom-calendar-header.component';

@Component({
  selector: 'app-date-choice-wrapper',
  templateUrl: './date-choice-wrapper.component.html',
  styleUrls: ['./date-choice-wrapper.component.scss']
})
export class DateChoiceWrapperComponent implements OnInit, OnDestroy {
  selected: Date | null = null;
  startDisabledDate: Date = new Date;
  endDisabledDates: Date = new Date;
  showCard: boolean = false;
  selectedTime: number = 0;
  selectedCard: number = 0;
  shouldClientDataBeSaved: boolean = false;
  subscriptions: Subscription[] = [];
  customHeader = CustomCalendarHeader;
  clientData: ClientData = new ClientData;
  studioData: StudioData[] = [];
  constructor(
    private storage: StorageService,
    private http: HttpService
  ) {
    this.subscriptions.push(this.storage.clientData$.subscribe(data => this.clientData = data));
    this.subscriptions.push(this.storage.shouldClientDataSaved$.subscribe((data) => {
      this.shouldClientDataBeSaved = data
    }));
    this.subscriptions.push(this.http.getDisabledDates().subscribe(data => {
      if (this.clientData.masterId !== 0) {
        data.forEach(d => {
          if (d.masterId == this.clientData.masterId) {
            this.endDisabledDates = new Date(2022, d.lastMonth, d.lastDay);
            this.startDisabledDate = new Date(2022, d.firstMonth, d.firstDay);
          }
        })
      } else {
        let tempFirstArray: Array<number> = []
        let tempEndArray: Array<number> = []
        let end = 0
        let first = 0
        data.forEach(d => {
          first = new Date(2022, d.firstMonth, d.firstDay).getTime()
          tempFirstArray.push(first)
          end = new Date(2022, d.lastMonth, d.lastDay).getTime()
          tempEndArray.push(end)
        })
        this.endDisabledDates = new Date(Math.max(...tempEndArray))
        this.startDisabledDate = new Date(Math.min(...tempFirstArray))
      }
    }))
  }

  ngOnInit(): void {
    if (this.clientData.time.hour != 0) {
      this.selected = this.clientData.date;
      this.showCard = true;
      this.selectedTime = this.clientData.time.hour;
      this.selectedCard = this.clientData.masterId;
    }
  }
  ngOnDestroy(): void {
    if (!this.shouldClientDataBeSaved) {
      if (this.clientData.masterWasSelected) {
        this.storage.setClientData({
          name: 'calendar',
          hour: 0,
          minute: 0,
          id: this.clientData.masterId,
          masterName: this.clientData.master,
          date: null
        })
      } else {
        this.storage.setClientData({
          name: 'calendar',
          hour: 0,
          minute: 0,
          id: 0,
          masterName: '',
          date: null
        })
      };
    }
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  timeIsChoisen(e: ChoisenTime): void {
    this.storage.setClientData({
      name: 'calendar',
      hour: Math.trunc(e.time),
      minute: Math.floor((e.time - Math.trunc(e.time)) * 100),
      id: e.masterId,
      masterName: e.masterName,
      date: this.selected
    });
    this.selectedTime = e.time;
    this.selectedCard = e.masterId;
  }
  dateWasSelected(e: Date): void {
    this.subscriptions.push(this.http.getCalendarData(
      e.getDate(),
      e.getMonth(),
      Number(this.clientData.masterId),
      this.clientData.service
    )
      .subscribe((response) => {
        this.studioData = [];
        if (this.clientData.masterWasSelected) {
          for (let i = 0; i < response.length; i++) {
            if (response[i].masterId == this.clientData.masterId) {
              this.studioData.push(response[i])
            }
          }
        } else {
          this.studioData = response
        };
        this.selected = e;
        this.showCard = true;
      }));
  }
}
