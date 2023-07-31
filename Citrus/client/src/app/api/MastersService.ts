import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MasterDto } from '@models/MasterDto';
import { MasterLoaderDto } from '@models/MasterLoaderDto';
import { HttpHelper } from '@helpers/HttpHelper';
import { PageableRequest } from '@interfaces/PageableRequest';
import { PageableResponse } from '@interfaces/PageableResponse';

@Injectable({
	providedIn: 'root',
})
export class MastersService {
	constructor(private http: HttpClient) {}

	getMasters(params: PageableRequest<MasterLoaderDto>): Observable<PageableResponse<MasterDto>> {
		const normalizedParams = HttpHelper.normalizeParams(params);
		return this.http.get<PageableResponse<MasterDto>>(
			'/api/masters',
			normalizedParams
				? {
						params: new HttpParams({ fromObject: normalizedParams }),
				  }
				: undefined,
		);
	}
}
