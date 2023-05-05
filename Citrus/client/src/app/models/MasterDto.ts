import { FilterItem } from '@shared/filter-dropdown/interfaces/FilterItem';

export interface MasterDto extends FilterItem {
	name: string;
	id: number | null;
}

export interface MasterLoaderDto {
	serviceId: number | null;
	masterId: number | null;
}
