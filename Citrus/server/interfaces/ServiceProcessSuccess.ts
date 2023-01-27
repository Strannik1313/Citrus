import { ProcessStatus } from '@enums/ProcessStatus';

export interface ServiceProcessSuccess<T> {
  message?: string;
  data: T;
  status: ProcessStatus.SUCCESS;
}
