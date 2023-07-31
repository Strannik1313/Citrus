import { LoadersUnion } from './LoadersUnion';

export type PageableRequest<T extends LoadersUnion> = {
	[key in keyof T]: string | boolean | number | undefined;
} & {
	size?: number;
	page?: number;
	orderBy?: string;
};
