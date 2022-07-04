import {BaseError, ErrorDetails} from './BaseError';
import {Result} from '../logic/Result';
import {UseCaseError} from './UseCaseError';

export namespace ApplicationError {
  export class UnexpectedError extends Result<BaseError> {
    constructor(cause?: Error) {
      super(
        false,
        new UseCaseError(`Encountered an unexpected error`, cause, undefined),
      );
    }
  }

  export class ValidationError extends Result<BaseError> {
    constructor(message: string, details?: ErrorDetails[]) {
      super(false, new UseCaseError(message, undefined, details));
    }
  }

  export class NotPermittedError extends Result<BaseError> {
    constructor(message: string, details?: ErrorDetails[]) {
      super(false, new UseCaseError(message, undefined, details));
    }
  }

  export class StateTransitionError extends Result<BaseError> {
    constructor(message: string, details?: ErrorDetails[]) {
      super(false, new UseCaseError(message, undefined, details));
    }
  }

  export class NotImplementedError extends Result<BaseError> {
    public constructor() {
      super(false, new UseCaseError(`Not implemented error`));
    }
  }

  export class DomainError extends Result<BaseError> {
    public constructor(cause: Error) {
      super(false, new UseCaseError(cause.message, cause, undefined));
    }
  }
}
