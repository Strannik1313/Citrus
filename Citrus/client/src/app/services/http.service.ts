import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ClientData } from '../models/client-data';
import { MasterData } from '../interfaces/master-data';
import { StudioData } from '../interfaces/studio-data';
import { StorageService } from './storage.service';
import { BlockedDate } from '../interfaces/blocked-date';
import { NewMasterFormData } from '../models/new-master-form-data';
import { NewServiceData } from '../interfaces/new-service-data';
import { OrderData } from '../models/order-data';
import { AuthFormData } from '../models/auth-form-data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private token: string = '';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) { };

  getCalendarData(
    d: number,
    m: number,
    id: number,
    procedure: string
  ): Observable<StudioData[]> {
    return this.http?.post<StudioData[]>('http://localhost:8080/api/calendar', {
      day: d,
      month: m,
      masterId: id,
      procedure: procedure
    });
  };

  getDisabledDates(): Observable<BlockedDate[]> {
    return this.http.get<BlockedDate[]>('http://localhost:8080/api/disabled');
  };

  getOrdersData(pageSize: number, startItem: number): Observable<OrderData[]> {
    return this.http?.get<OrderData[]>('http://localhost:8080/api/admin/orders', {
      headers: new HttpHeaders({
        pageSize: pageSize.toString(),
        startItem: startItem.toString()
      })
    });
  };

  getPersonalOrders(pageSize: number, startItem: number): Observable<OrderData[]> {
    return this.http?.get<OrderData[]>('/api/personal/orders', {
      headers: new HttpHeaders({
        pageSize: pageSize.toString(),
        startItem: startItem.toString()
      })
    });
  };

  getStudioServices(): Observable<string[]> {
    return this.http?.get<string[]>('/api/admin/services')
  };

  createNewMaster(formValue: NewMasterFormData): Observable<{ message: string }> {
    return this.http?.post<{ message: string }>('/api/admin/master', formValue);
  };

  createNewService(formValue: NewServiceData): Observable<{ message: string }> {
    return this.http?.post<{ message: string }>('/api/admin/service', formValue);
  };

  cancelOrder(orderId: number): Observable<{ message: string, statusCode: number }> {
    return this.http?.delete<{ message: string, statusCode: number }>('/api/admin/orders', {
      headers: new HttpHeaders({
        orderId: orderId.toString()
      })
    });
  };

  completeOrder(orderId: number): Observable<{ message: string, statusCode: number }> {
    return this.http?.patch<{ message: string, statusCode: number }>('/api/admin/orders', { orderId });
  };

  makeOrder(formValue: ClientData): Observable<{ message: boolean }> {
    return this.http?.post<{ message: boolean }>('/api/order', formValue);
  };

  getMasterData(): Observable<MasterData[]> {
    return this.http?.get<MasterData[]>('/api/masters');
  };

  login(formValue: AuthFormData): Observable<{ token: string, payload?: any }> {
    return this.http?.post<{ token: string, payload: any }>('/api/auth/login', formValue)
      .pipe(
        tap(
          ({ token, payload }) => {
            localStorage.setItem('authToken', token);
            this.setToken(token);
            this.storage?.setIsTokenValid(true);
            if (payload?.admin) {
              this.storage?.setIsAdmin(true);
            } else {
              this.storage?.setIsAdmin(false);
              this.storage?.setAuthorizedUserData({ ...payload });
              this.storage?.setHaveAccountFormData(true);
            }
            this.storage?.setRoadMap('clear');
            this.storage?.setBackButtonStatus();
          }
        )
      );
  };

  register(formValue: AuthFormData): Observable<{ message: string }> {
    return this.http?.post<{ message: string }>('/api/auth/register', formValue);
  };

  personal(formValue: { name: string, surname: string, phoneNumber: string }): Observable<{ email: string, password: string }> {
    return this.http?.post<{ email: string, password: string }>('/api/personal', formValue);
  };

  me(): Observable<any> {
    return this.http?.get<any>('/api/auth/me')
      .pipe(
        tap((data) => {
          if (data?.admin) {
            this.storage?.setIsAdmin(true);
          };
          this.storage?.setIsTokenValid(true);
          this.storage?.setHaveAccountFormData(true);
        }),
        catchError(() => {
          this.setToken('');
          localStorage?.clear();
          this.storage?.setIsTokenValid(false);
          this.storage?.setIsAdmin(false);
          this.storage?.setHaveAccountFormData(false);
          return of();
        })
      );
  };

  setToken(token: string) {
    this.token = token;
  };

  getToken(): string {
    return this.token;
  };

  isAuthenticated(): boolean {
    return !!this.token;
  };

  logout() {
    this.setToken('');
    localStorage?.clear();
    this.storage?.setIsTokenValid(false);
    this.storage?.setHaveAccountFormData(false);
    this.router?.navigate(['/']);
    this.storage?.setRoadMap('clear');
    this.storage?.setBackButtonStatus();
  };
}