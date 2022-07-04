export enum HttpErrorCodes {
  AuthorizationError = 1001,
  ValidationError = 1002,
  NotPermittedError = 1003,
  ForbiddenError = 1004,
  AccessTokenExpired = 1005,
  InvalidToken = 1006,
  EmailAlreadySent = 1007,
  BadRequestError = 1008,
  DateError = 1009,
  InternalServerError = 1010,

  // USER
  UserNotFoundError = 2001,
  RegisterUserFailedError = 2002,
  UsernameAlreadyExistsError = 2003,

  // AUTH
  InvalidRoleAccess = 3001,
  InvalidUsernamePasswordError = 3002,
}

export type HttpErrorCode = number;
