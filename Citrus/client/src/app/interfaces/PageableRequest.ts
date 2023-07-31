import { LoadersUnion } from './LoadersUnion';

export type PageableRequest<T extends LoadersUnion> = {
	[key in keyof T]: T[key];
} & {
	size?: number;
	page?: number;
	orderBy?: string;
};
