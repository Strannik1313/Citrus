import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { CalendarData } from 'src/app/interfaces/calendar-data';
import { ChoisenTime } from 'src/app/interfaces/choisen-time';
import { ClientData } from 'src/app/interfaces/client-data';
import { StudioData } from 'src/app/interfaces/studio-data';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { CustomCalendarHeader } from './date-choice-layout/custom-calendar-header/custom-calendar-header.component';

@Component({
  selector: 'app-date-choice-wrapper',
  templateUrl: './date-choice-wrapper.component.html',
  styleUrls: ['./date-choice-wrapper.component.scss']
})
export class DateChoiceWrapperComponent implements OnInit, OnDestroy {
  selected: Date | null = null
  showCard: boolean = false
  selectedTime: boolean = false
  shouldClientDataBeSaved: boolean = false
  subscriptionCalendar: Subscription = new Subscription
  subscriptionClientData: Subscription = new Subscription
  subscriptionShouldClientDataBeSaved: Subscription
  customHeader = CustomCalendarHeader
  clientData: ClientData = {
    master: '',
    masterId: '',
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
  studioData: StudioData[] = []
  constructor(
    private storage: StorageService,
    private http: HttpService
  ) {
    this.storage.clientData$.subscribe(data => this.clientData = data)
    this.subscriptionShouldClientDataBeSaved = this.storage.shouldClientDataSaved$.subscribe((data) => {
      this.shouldClientDataBeSaved = data
    })
  }

  ngOnInit(): void {
    if (this.clientData.time.hour != 0) {
      this.selected = this.clientData.date
      this.showCard = true
    }
  }
  ngOnDestroy(): void {
    if (!this.shouldClientDataBeSaved) {
      this.storage.setClientData({
        name: 'calendar',
        hour: 0,
        minute: 0,
        id: 0,
        masterName: '',
        date: null
      })
    }
    this.subscriptionShouldClientDataBeSaved.unsubscribe()
    this.subscriptionCalendar.unsubscribe()
    this.subscriptionClientData.unsubscribe()
  }
  timeIsChoisen(e: ChoisenTime): void {
    this.storage.setClientData({
      name: 'calendar',
      hour: Math.trunc(e.time),
      minute: Math.floor((e.time - Math.trunc(e.time)) * 100),
      id: e.masterId,
      masterName: e.masterName,
      date: this.selected
    })
    this.selectedTime = true
  }
  dateWasSelected(e: Date): void {

    this.subscriptionCalendar = this.http.getCalendarData(
      e.getDate(),
      e.getMonth(),
      Number(this.clientData.masterId),
      this.clientData.services
    )
      .subscribe((response) => {
        this.studioData = []
        if (this.clientData.masterId) {
          for (let i = 0; i < response.length; i++) {
            if (response[i].masterId == this.clientData.masterId) {
              this.studioData.push(response[i])
            }
          }
        } else {
          if (this.clientData.services.length > 0) {
            this.studioData = response
          }
        }

        this.selected = e
        this.showCard = true
      })
  }
}
