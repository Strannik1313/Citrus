import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MasterCard } from '@interfaces/free-times';
import { NewServiceData } from '@interfaces/new-service-data';
import { AuthFormData } from '@models/auth-form-data';
import { ClientData } from '@models/client-data';
import { MasterData } from '@models/master-data';
import { NewMasterFormData } from '@models/new-master-form-data';
import { OrderData } from '@models/order-data';
import { Service } from '@models/service';
import { UserModel } from '@models/user-model';
import { StorageService } from '@services/storage.service';
import { catchError, Observable, of, tap } from 'rxjs';

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
		date: Date,
		masterId: number,
	): Observable<Date[]> {
		return this.http.post<Date[]>('/api/calendar', {
			serviceId,
			date,
			masterId,
		});
	}

	getMasterData(serviceId: number, masterId: number): Observable<MasterData[]> {
		return this.http?.post<MasterData[]>('/api/masters', {
			serviceId,
			masterId,
		});
	}

	getMasterCard(
		serviceId: number,
		date: Date,
		masterId: number,
	): Observable<Array<MasterCard>> {
		return this.http.post<Array<MasterCard>>('/api/calendar/mastercard', {
			serviceId,
			date,
			masterId,
		});
	}

	getOrdersData(pageSize: number, startItem: number): Observable<OrderData[]> {
		return this.http?.get<OrderData[]>('/api/admin/orders', {
			headers: new HttpHeaders({
				pageSize: pageSize?.toString(),
				startItem: startItem?.toString(),
			}),
		});
	}

	getPersonalOrders(
		pageSize: number,
		startItem: number,
	): Observable<OrderData[]> {
		return this.http?.get<OrderData[]>('/api/personal/orders', {
			headers: new HttpHeaders({
				pageSize: pageSize?.toString(),
				startItem: startItem?.toString(),
			}),
		});
	}

	getStudioServices(): Observable<string[]> {
		return this.http?.get<string[]>('/api/admin/services');
	}

	createNewMaster(
		formValue: NewMasterFormData,
	): Observable<{ message: string }> {
		return this.http?.post<{ message: string }>('/api/admin/master', formValue);
	}

	createNewService(formValue: NewServiceData): Observable<{ message: string }> {
		return this.http?.post<{ message: string }>(
			'/api/admin/service',
			formValue,
		);
	}

	cancelOrder(
		orderId: number,
	): Observable<{ message: string; statusCode: number }> {
		return this.http?.delete<{ message: string; statusCode: number }>(
			'/api/admin/orders',
			{
				headers: new HttpHeaders({
					orderId: orderId.toString(),
				}),
			},
		);
	}

	completeOrder(
		orderId: number,
	): Observable<{ message: string; statusCode: number }> {
		return this.http?.patch<{ message: string; statusCode: number }>(
			'/api/admin/orders',
			{ orderId },
		);
	}

	makeOrder(formValue: ClientData): Observable<{ message: boolean }> {
		return this.http?.post<{ message: boolean }>('/api/order', formValue);
	}

	getServices(): Observable<Service[]> {
		return this.http?.get<Service[]>('/api/services');
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

	personal(formValue: {
		name: string;
		surname: string;
		phoneNumber: string;
	}): Observable<{ email: string; password: string }> {
		return this.http?.post<{ email: string; password: string }>(
			'/api/personal',
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
