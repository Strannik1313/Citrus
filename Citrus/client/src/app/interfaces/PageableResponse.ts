export interface PageableResponse<T> {
	total: number;
	current: number;
	result: T[];
}
