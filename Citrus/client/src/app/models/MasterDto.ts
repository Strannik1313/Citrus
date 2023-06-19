import { FilterItem } from '@shared/filter-dropdown/interfaces/FilterItem';

export interface MasterDto extends FilterItem {
	name: string;
	id: string | null;
	prices: number[];
	servicesId: string[];
}
