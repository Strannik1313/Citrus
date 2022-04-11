import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MasterData } from '../interfaces/master-data';
import { StudioData } from '../interfaces/studio-data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  getCalendarData(
    d: number,
    m: number,
    id: number,
    procedure: Array<string>
  ): Observable<StudioData[]> {
    return this.http.get<StudioData[]>('https://jsonplaceholder.typicode.com/todos/1', {
      params: {
        day: d,
        month: m,
        masterId: id,
        procedure: procedure
      }
    })
      .pipe(
        map((response) => {
          return [{
            masterName: 'Anastasiya',
            masterId: '1',
            arrayOfFreeTimes: [10.30, 12, 14, 16, 18],
            price: 50,
            procedureDuration: {
              hour: 1,
              minute: 30
            }
          },
          {
            masterName: 'Lena',
            masterId: '2',
            arrayOfFreeTimes: [10, 12, 16, 18],
            price: 40,
            procedureDuration: {
              hour: 2,
              minute: 0
            }
          }]
        }))
  }

  getMasterData(): Observable<MasterData[]> {
    return this.http.get<MasterData[]>('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        map(
          (response) => {
            return [{
              name: 'Anastasiya',
              services: ['manikur', 'pedikur'],
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