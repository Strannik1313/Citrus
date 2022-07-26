import { Injectable } from '@angular/core';
import { Service } from '@models/service';
import { Observable, of } from 'rxjs';

type FilterDataType = Service;

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	private service: FilterDataType[] = [];
	setFilter(filterKey?: string): Observable<FilterDataType[]> {
		if (!!filterKey) {
			const temp: Service[] = [];
			this.service.forEach(service => {
				if (service.title.indexOf(filterKey) !== -1) {
					temp.push(service);
				}
			});
			return of(temp);
		} else {
			return of(this.service);
		}
	}
	setData(data: FilterDataType[]): void {
		this.service = data;
	}
}
