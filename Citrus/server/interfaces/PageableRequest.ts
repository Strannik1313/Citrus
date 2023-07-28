import { FilterUnion } from '@interfaces/FilterUnion';
import { Pagination } from '@interfaces/Pagination';

export interface PageableRequest<T extends FilterUnion> {
	pagination?: Pagination;
	filter?: T;
	orderBy?: string;
}
