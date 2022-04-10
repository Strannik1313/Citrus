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
  subscriptionCalendar: Subscription = new Subscription
  subscriptionClientData: Subscription = new Subscription
  customHeader = CustomCalendarHeader
  clientData: ClientData = {
    master: '',
    masterId: '',
    services: [],
    date: '',
    time: {
      hour: '',
      minute: ''
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
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscriptionCalendar.unsubscribe()
    this.subscriptionClientData.unsubscribe()
  }
  timeIsChoisen(e: ChoisenTime): void {
    console.log(Math.trunc(e.time))
    this.storage.setClientData({
      name: 'calendar',
      value: e.time,
      id: e.masterId
    })
  }
  dateWasSelected(e: Date): void {
    this.studioData = []
    this.subscriptionCalendar = this.http.getCalendarData(
      e.getDate(),
      e.getMonth(),
      Number(this.clientData.masterId),
      this.clientData.services
    )
      .subscribe((response) => {
        if (this.clientData.masterId) {
          for (let i = 0; i < response.length; i++) {
            if (response[i].masterId == this.clientData.masterId){
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
