import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FilterDataType {
	title: string;
}

@Injectable({
	providedIn: 'root',
})
export class FilterService<T extends FilterDataType> {
	private filteredArray: T[] = [];
	setFilter(filterKey?: string): Observable<T[]> {
		if (!!filterKey) {
			const temp: T[] = [];
			this.filteredArray?.forEach(item => {
				if (item?.title?.indexOf(filterKey) !== -1) {
					temp.push(item);
				}
			});
			return of(temp);
		} else {
			return of(this.filteredArray);
		}
	}
	setData(data: T[]): void {
		this.filteredArray = data;
	}
}
