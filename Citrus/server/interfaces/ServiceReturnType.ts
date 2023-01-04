import { ServiceProcessSuccess } from './ServiceProcessSuccess';
import { ServiceProcessError } from './ServiceProcessError';

export type ServiceReturnType<T> =
	| ServiceProcessSuccess<T>
	| ServiceProcessError;
