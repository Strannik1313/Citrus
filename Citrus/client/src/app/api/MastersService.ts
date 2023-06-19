import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterDto } from '@models/MasterDto';
import { MasterLoaderDto } from '@models/MasterLoaderDto';
import { HttpHelper } from '@helpers/HttpHelper';

@Injectable({
	providedIn: 'root',
})
export class MastersService {
	constructor(private http: HttpClient) {}

	getMasters(params: MasterLoaderDto): Observable<Array<MasterDto>> {
		let normalizedParams = HttpHelper.normalizeParams(params);
		return this.http.get<Array<MasterDto>>(
			'/api/masters',
			normalizedParams
				? {
						params: new HttpParams({ fromObject: normalizedParams }),
				  }
				: undefined,
		);
	}
}
