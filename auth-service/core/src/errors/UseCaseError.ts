import {BaseError, ErrorDetails} from './BaseError';

export class UseCaseError extends BaseError {
  constructor(message: string, cause?: Error, details?: ErrorDetails[]) {
    super('UseCaseError', message, cause, details);
  }
}
