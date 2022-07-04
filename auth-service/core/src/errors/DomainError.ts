import {BaseError, ErrorDetails} from './BaseError';

export class DomainError extends BaseError {
  constructor(message: string, details?: ErrorDetails[]) {
    super('DomainError', message, undefined, details);
  }
}
