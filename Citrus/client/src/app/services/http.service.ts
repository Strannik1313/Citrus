import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFormData } from '@models/auth-form-data';
import { UserModel } from '@models/user-model';
import { StorageService } from '@services/storage.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { Service } from '@interfaces/service';
import { Master } from '@models/master-data';
import { Order } from '@interfaces/order';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	private token: string = '';
	private userModel: UserModel = UserModel.Unauth;
	constructor(
		private http: HttpClient,
		private storage: StorageService,
		private router: Router,
	) {}

	getDates(
		serviceId: number,
		dateRangeStart: Date,
		dateRangeEnd: Date,
	): Observable<Array<Date>> {
		return this.http.post<Array<Date>>('/api/calendar', {
			serviceId,
			dateRangeStart,
			dateRangeEnd,
		});
	}

	getMasters(
		serviceId: number,
		masterId: number | null,
	): Observable<Array<Master>> {
		return this.http?.post<Array<Master>>('/api/masters', {
			serviceId,
			masterId,
		});
	}

	getOrders(
		serviceId: number,
		date: Date | null,
		masterId: number | null,
	): Observable<Array<Order>> {
		return this.http.post<Array<Order>>('/api/calendar/orders', {
			serviceId,
			date,
			masterId,
		});
	}

	getServices(): Observable<Array<Service>> {
		return this.http?.get<Array<Service>>('/api/services');
	}

	login(formValue: AuthFormData): Observable<{ token: string; payload?: any }> {
		return this.http
			?.post<{ token: string; payload: any }>('/api/auth/login', formValue)
			.pipe(
				tap(({ token, payload }) => {
					localStorage.setItem('authToken', token);
					this.setToken(token);
					this.storage?.setIsTokenValid(true);
					this.storage?.setCurrentUserModel({
						isAdmin: payload?.admin,
						isAuth: true,
					});
					if (this.userModel === UserModel.Admin) {
						this.storage?.setIsAdmin(true);
					} else {
						this.storage?.setIsAdmin(false);
						this.storage?.setAuthorizedUserData({ ...payload });
						this.storage?.setHaveAccountFormData(true);
					}
				}),
			);
	}

	register(formValue: AuthFormData): Observable<{ message: string }> {
		return this.http?.post<{ message: string }>(
			'/api/auth/register',
			formValue,
		);
	}

	me(): Observable<any> {
		return this.http?.get<any>('/api/auth/me').pipe(
			tap(data => {
				this.storage?.setIsTokenValid(true);
				this.storage?.setHaveAccountFormData(true);
				this.storage?.setCurrentUserModel({
					isAdmin: data?.admin,
					isAuth: true,
				});
			}),
			catchError(() => {
				this.setToken('');
				localStorage?.clear();
				this.storage?.setIsTokenValid(false);
				this.storage?.setIsAdmin(false);
				this.storage?.setHaveAccountFormData(false);
				this.storage?.setCurrentUserModel({ isAdmin: false, isAuth: false });
				return of();
			}),
		);
	}

	setToken(token: string) {
		this.token = token;
	}

	getToken(): string {
		return this.token;
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	logout() {
		this.setToken('');
		localStorage?.clear();
		this.storage?.setIsTokenValid(false);
		this.storage?.setIsAdmin(false);
		this.storage?.setHaveAccountFormData(false);
		this.router?.navigate(['/']);
		this.storage?.setCurrentUserModel({ isAdmin: false, isAuth: false });
	}
}
