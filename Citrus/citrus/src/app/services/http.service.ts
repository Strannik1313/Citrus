import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MasterData } from '../interfaces/master-data';
import { StudioData } from '../interfaces/studio-data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  getCalendarData(): Observable<StudioData> {
    return this.http.get<StudioData>('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        map((response) => {
          return {
            arrayOfFreeTimes: [10, 12, 14, 16, 18],
            maxLoad: 5
          }
        }))
  }

  getClientData(): Observable<MasterData[]> {
    return this.http.get<MasterData[]>('https://jsonplaceholder.typicode.com/todos/1')
    .pipe(
      map(
        (response)=>{
          return [{
            name: 'Anastasiya',
            services: ['manikur','pedikur'],
            id: '1'
          },
          {
            name: 'Lena',
            services: ['manikur'],
            id: '2'
          }
        ]
        }
      )
    )
  }
}