import { Observable } from 'rxjs';
import { ServiceDto } from '@models/ServiceDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ServicesService {
	constructor(private http: HttpClient) {}
	getServices(filter: string | null): Observable<Array<ServiceDto>> {
		return this.http.post<Array<ServiceDto>>('/api/services', {
			filter,
		});
	}
}
