import { Component,  Input, OnInit } from '@angular/core';
import { StudioData } from 'src/app/interfaces/studio-data';


@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.scss']
})
export class CalendarItemComponent implements OnInit {
  typeOfProgressBar: string = 'success'
  toogleProgressBar: boolean = false
  @Input() currentDate: Date = new Date
  @Input() clientCount: number = 0
  @Input() studioData: StudioData = {
    maxLoad: 0,
    arrayOfFreeTimes: []
  }

  constructor() {}

  ngOnInit(): void {
   
  }
  

}
