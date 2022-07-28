import { FilterDataType } from '@services/filter.service';

export class Service implements FilterDataType {
	title: string = '';
	description: string = '';
	cost: number = 0;
	duration: number = 0;
	id: number = 0;
}
