import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MasterData } from '@models/master-data';

@Injectable()
export class FilterService {
	private currentValue: Array<Date | MasterData> = [];
	constructor(private pipe: DatePipe) {}
	getIterableValues(value: Array<Date | MasterData>): Array<string> {
		this.currentValue = value;
		if (typeof value[0] === 'string') {
			return value.map(value => {
				let temp = this.pipe.transform(<Date>value, 'LLLL');
				return temp || '';
			});
		} else {
			return value.map(value => {
				let temp = <MasterData>value;
				return temp.name;
			});
		}
	}
	getValueForEmit(key: string): Date | MasterData | undefined {
		if (typeof this.currentValue[0] === 'string') {
			return this.currentValue.find(date => {
				let currDate = <Date>date;
				return this.pipe.transform(<Date>currDate, 'LLLL') === key;
			});
		} else {
			return this.currentValue.find(master => {
				let mstr = <MasterData>master;
				return mstr.name === key;
			});
		}
	}
}
