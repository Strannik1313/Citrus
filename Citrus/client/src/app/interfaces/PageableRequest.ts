import { Pagination } from './Pagination';
import { LoadersUnion } from './LoadersUnion';

export interface PageableRequest<T extends LoadersUnion> {
	pagination?: Pagination;
	filter?: T;
	orderBy?: string;
}
