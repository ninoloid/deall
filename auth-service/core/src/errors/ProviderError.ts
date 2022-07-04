import {BaseError, ErrorDetails} from './BaseError';

export class ProviderError extends BaseError {
  constructor(message: string, cause?: Error, details?: ErrorDetails[]) {
    super('ProviderError', message, cause, details);
  }
}
