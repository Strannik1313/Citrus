import { Observable } from 'rxjs';
import { Service } from '@models/service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ServicesService {
	constructor(private http: HttpClient) {}
	getServices(filter: string | null): Observable<Array<Service>> {
		return this.http.post<Array<Service>>('/api/services', {
			filter,
		});
	}
}
