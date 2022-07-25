import { Injectable } from '@angular/core';
import { Service } from '@models/service';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	private data: Service[] = [];
	setFilter(filterKey: string): Observable<Service[]> {
		if (!!filterKey) {
			const temp: Service[] = [];
			this.data.forEach(service => {
				if (service.title.indexOf(filterKey) !== -1) {
					temp.push(service);
				}
			});
			return of(temp);
		} else {
			return of(this.data);
		}
	}
	setData(data: Service[]): void {
		this.data = data;
	}
}
