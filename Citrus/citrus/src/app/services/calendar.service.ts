import { Injectable } from '@angular/core';
import { CalendarData } from '../interfaces/calendar-data';
import { HttpService } from './http.service';




@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private currentDate: Date = new Date
  private currentMonth: number = 0
  private daysInCurrentMonth: number = 0
  private dateArray: Array<Date> = []
  constructor(private http: HttpService) { }

  getData(): CalendarData {
    this.currentDate = new Date
    this.currentMonth = this.currentDate.getMonth()
    this.daysInCurrentMonth = 33 - new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 33).getDate()
    
    for (let i = 0; i < this.daysInCurrentMonth; i++) {
      this.dateArray[i] = new Date (this.currentDate.getFullYear(), this.currentMonth, i+1)
    }

    const calendarData: CalendarData = {
    date: this.currentDate,
    month: this.currentMonth,
    day: this.daysInCurrentMonth,
    array: this.dateArray
    }

    return calendarData

  }


}
