import { SearchDataType } from '@services/search.service';

export class Service implements SearchDataType {
	title: string = '';
	description: string = '';
	cost: number = 0;
	duration: number = 0;
	id: number = 0;
}
