import { FilterUnion } from '@interfaces/FilterUnion';

export type PageableRequest<T extends FilterUnion> = {
	[key in keyof T]: T[key];
} & {
	orderBy?: string;
	size?: number;
	page?: number;
};
