import {HttpErrorCode, HttpErrorCodes} from './HttpErrorCodes';

export class HttpErrorMessages {
  public static getErrorMessage(code: HttpErrorCode): string {
    let message: string | undefined;

    switch (code) {
      case HttpErrorCodes.ValidationError:
        message = 'Invalid Operation Parameter';
        break;
      case HttpErrorCodes.AuthorizationError:
        message = 'Invalid Authorization Token';
        break;
      case HttpErrorCodes.ForbiddenError:
        message = 'Access Denied';
        break;
      case HttpErrorCodes.InvalidToken:
        message = 'Invalid Token';
        break;
      case HttpErrorCodes.AccessTokenExpired:
        message = 'Access Token Expired';
        break;
      case HttpErrorCodes.DateError:
        message = 'Date Error';
        break;
      case HttpErrorCodes.InternalServerError:
        message = 'Internal Server Error';
        break;
      case HttpErrorCodes.UserNotFoundError:
        message = 'User Not Found';
        break;
      case HttpErrorCodes.RegisterUserFailedError:
        message = 'Register User Failed';
        break;
      case HttpErrorCodes.UsernameAlreadyExistsError:
        message = 'Username Already Exists';
        break;
      case HttpErrorCodes.InvalidUsernamePasswordError:
        message = 'Invalid Username or Password';
        break;
      default:
        message = 'Unknown Error';
        break;
    }

    return message;
  }
}
