import {BaseError} from './BaseError';

export class InvalidOperationError extends BaseError {
  constructor(message: string, cause?: BaseError) {
    super('InvalidOperationError', message, cause);
  }
}
