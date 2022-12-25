import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Master, MastersResponse } from '@models/master';

@Injectable({
	providedIn: 'root',
})
export class MastersService {
	constructor(private http: HttpClient) {}
	getMasters(params: MastersResponse): Observable<Array<Master>> {
		return this.http.post<Array<Master>>('/api/masters', {
			serviceId: params.serviceId,
			masterId: params.masterId,
		});
	}
}
