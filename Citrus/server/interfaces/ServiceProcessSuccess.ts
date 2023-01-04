import { ProcessStatus } from '../enums/ProcessStatus.js';

export interface ServiceProcessSuccess<T> {
	message?: string;
	data: T;
	status: ProcessStatus.SUCCESS;
}
