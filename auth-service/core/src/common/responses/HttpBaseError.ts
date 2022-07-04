import {BaseError, ErrorDetails} from '../../errors/BaseError';
import {HttpErrorCode} from './HttpErrorCodes';
import {HttpErrorMessages} from './HttpErrorMessages';

export abstract class HttpBaseError extends BaseError {
  public readonly code: HttpErrorCode;

  constructor(
    name: string,
    code: HttpErrorCode,
    cause?: BaseError,
    details?: ErrorDetails[],
  ) {
    super(name, HttpErrorMessages.getErrorMessage(code), cause, details);
    this.code = code;
  }
}
