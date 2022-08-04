import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@models/user-model';
import { StorageService } from '@services/storage.service';
import { Observable } from 'rxjs';
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
}
