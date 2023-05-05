import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterDto, MasterLoaderDto } from '@models/MasterDto';

@Injectable({
	providedIn: 'root',
})
export class MastersService {
	constructor(private http: HttpClient) {}
	getMasters(params: MasterLoaderDto): Observable<Array<MasterDto>> {
		return this.http.post<Array<MasterDto>>('/api/masters', {
			serviceId: params.serviceId,
			masterId: params.masterId,
		});
	}
}
