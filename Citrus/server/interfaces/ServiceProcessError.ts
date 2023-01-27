import { ProcessStatus } from '@enums/ProcessStatus';

export interface ServiceProcessError {
  status: ProcessStatus.ERROR;
  // a friendly, sensible message
  message: string;
  // The error that caused this process to fail. Useful for debugging.
  cause?: Error;
}
