import {BaseError} from '../../errors/BaseError';
import {HttpBaseError} from './HttpBaseError';
import {HttpErrorCodes} from './HttpErrorCodes';

export namespace HttpError {
  export class ValidationError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'ValidationError',
        HttpErrorCodes.ValidationError,
        cause,
        cause?.details,
      );
    }
  }

  export class NotPermittedError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'NotPermittedError',
        HttpErrorCodes.NotPermittedError,
        cause,
        cause?.details,
      );
    }
  }

  export class ForbiddenError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'ForbiddenEror',
        HttpErrorCodes.ForbiddenError,
        cause,
        cause?.details,
      );
    }
  }

  export class AccessTokenExpired extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'AccessTokenExpired',
        HttpErrorCodes.AccessTokenExpired,
        cause,
        cause?.details,
      );
    }
  }

  export class AuthorizationError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'AuthorizationError',
        HttpErrorCodes.AuthorizationError,
        cause,
        cause?.details,
      );
    }
  }

  export class InvalidToken extends HttpBaseError {
    constructor(cause?: BaseError) {
      super('InvalidToken', HttpErrorCodes.InvalidToken, cause, cause?.details);
    }
  }

  export class InternalServerError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'InternalServerError',
        HttpErrorCodes.InternalServerError,
        cause,
        cause?.details,
      );
    }
  }

  export class BadRequestError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'BadRequestError',
        HttpErrorCodes.BadRequestError,
        cause,
        cause?.details,
      );
    }
  }

  export class DateError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super('DateError', HttpErrorCodes.DateError, cause, cause?.details);
    }
  }

  export class UserNotFoundError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'UserNotFoundError',
        HttpErrorCodes.UserNotFoundError,
        cause,
        cause?.details,
      );
    }
  }

  export class RegisterUserFailedError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'RegisterUserFailedError',
        HttpErrorCodes.RegisterUserFailedError,
        cause,
        cause?.details,
      );
    }
  }

  export class UsernameAlreadyExistsError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'UsernameAlreadyExistsError',
        HttpErrorCodes.UsernameAlreadyExistsError,
        cause,
        cause?.details,
      );
    }
  }

  export class InvalidUsernamePasswordError extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'InvalidUsernamePasswordError',
        HttpErrorCodes.InvalidUsernamePasswordError,
        cause,
        cause?.details,
      );
    }
  }

  export class InvalidRoleAccess extends HttpBaseError {
    constructor(cause?: BaseError) {
      super(
        'InvalidRoleAccess',
        HttpErrorCodes.InvalidRoleAccess,
        cause,
        cause?.details,
      );
    }
  }
}
