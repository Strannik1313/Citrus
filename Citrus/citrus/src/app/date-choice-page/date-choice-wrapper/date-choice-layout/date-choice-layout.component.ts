import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoisenTime } from 'src/app/interfaces/choisen-time';
import { ClientData } from 'src/app/interfaces/client-data';
import { StudioData } from 'src/app/interfaces/studio-data';

@Component({
  selector: 'app-date-choice-layout',
  templateUrl: './date-choice-layout.component.html',
  styleUrls: ['./date-choice-layout.component.scss']
})
export class DateChoiceLayoutComponent implements OnInit {
  @Input() customHeader: any
  @Input() showCard: boolean = false
  @Input() selected: Date | null = null
  @Input() clientData: ClientData = {
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
  @Input() studioData: StudioData[] = []
  @Output() dateWasSelected: EventEmitter<Date> = new EventEmitter
  @Output() timeWasSelected: EventEmitter<ChoisenTime> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
  }
  dateSelected(e: any): void {
    this.dateWasSelected.emit(e)
  }
  timeIsChoisen(time: number, masterId: string): void {
    this.timeWasSelected.emit({
      time,
      masterId
    })
  }
}
