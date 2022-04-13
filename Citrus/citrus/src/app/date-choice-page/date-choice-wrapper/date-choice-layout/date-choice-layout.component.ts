import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoisenTime } from 'src/app/interfaces/choisen-time';
import { ClientData } from 'src/app/interfaces/client-data';
import { StudioData } from 'src/app/interfaces/studio-data';

@Component({
  selector: 'app-date-choice-layout',
  templateUrl: './date-choice-layout.component.html',
  styleUrls: ['./date-choice-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateChoiceLayoutComponent implements OnInit {
  @Input() customHeader: any
  @Input() showCard: boolean = false
  @Input() selected: Date | null = null
  @Input() selectedTime: number = 0
  @Input() selectedCard: number = 0
  @Input() clientData: ClientData = {
    master: '',
    masterId: 0,
    masterWasSelected: false,
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
  @Input() studioData: StudioData[] = []
  @Output() dateWasSelected: EventEmitter<Date> = new EventEmitter
  @Output() timeWasSelected: EventEmitter<ChoisenTime> = new EventEmitter
  constructor() { }

  ngOnInit(): void {
    if (this.showCard) {
      this.selected != null? this.dateWasSelected.emit(this.selected): null
    }
  }
  dateSelected(e: any): void {
    this.dateWasSelected.emit(e)
  }
  timeIsChoisen(
    time: number,
    masterId: number,
    masterName: string
  ): void {
    this.timeWasSelected.emit({
      time,
      masterId,
      masterName
    })
  }
}
