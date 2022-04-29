import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ClientData } from '../models/client-data';
import { MasterData } from '../interfaces/master-data';
import { StudioData } from '../interfaces/studio-data';
import { StorageService } from './storage.service';
import { BlockedDate } from '../interfaces/blocked-date';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private token: string = ''
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) { }

  getCalendarData(
    d: number,
    m: number,
    id: number,
    procedure: string
  ): Observable<StudioData[]> {
    return this.http.post<StudioData[]>('http://localhost:8080/api/calendar', {
      day: d,
      month: m,
      masterId: id,
      procedure: procedure
    })
  }

  getDisabledDates(): Observable<BlockedDate[]> {
    return this.http.get<BlockedDate[]>('http://localhost:8080/api/disabled')
  }

  makeOrder(formValue: ClientData): Observable<{message: boolean}> {
    return this.http.post<any>('http://localhost:8080/api/order', formValue)
  }

  getMasterData(): Observable<MasterData[]> {
    return this.http.get<MasterData[]>('http://localhost:8080/api/masters')
  }

  login(formValue: any): Observable<{ token: string, payload: any }> {
    return this.http.post<{ token: string, payload: any }>('http://localhost:8080/api/auth/login', formValue)
      .pipe(
        tap(
          ({ token, payload }) => {
            localStorage.setItem('authToken', token)
            this.setToken(token)
            this.storage.setIsTokenValid(true)
            this.storage.setAuthorizedUserData({ ...payload })
            this.storage.setHaveAccountFormData(true)
          }
        )
      )
  }
  register(formValue: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('http://localhost:8080/api/auth/register', formValue)
  }
  personal(formValue: any): Observable<{ email: string, password: string }> {
    return this.http.post<{ email: string, password: string }>('http://localhost:8080/api/personal', formValue)
  }

  me(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/auth/me')
      .pipe(
        tap(() => {
          this.storage.setIsTokenValid(true)
          this.storage.setHaveAccountFormData(true)
        }),
        catchError(() => {
          this.setToken('')
          localStorage.clear()
          this.storage.setIsTokenValid(false)
          this.storage.setHaveAccountFormData(false)
          return of()
        })
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken('')
    localStorage.clear()
    this.storage.setIsTokenValid(false)
    this.storage.setHaveAccountFormData(false)
    this.router.navigate(['/'])
  }
}