import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import CompositionRoot from '../../core/src/application-service/CompositionRoot';
import {TokenProviderErrors} from '../../core/src/modules/auth/providers/TokenProviderErrors';
import {HttpError} from '../../core/src/common/responses/HttpError';
import {forbidden, fail} from '../../core/src/common/responses/HandlerResponse';
import {UserRole} from '../../core/src/common/Constants';

export const authenticationMiddleware = (accessRole = [UserRole.ADMIN, UserRole.USER]) => {
  return async function(req: Request, res: Response, next: NextFunction) {
    CompositionRoot.composeApplication();
  
    const JwtTokenProvider = CompositionRoot.getJwtTokenProvider();
    const JwtPrivateKey = CompositionRoot.getJwtPrivateKey();
  
    try{
      const authorization = req.headers.authorization;
  
      if (!authorization) {
        throw new TokenProviderErrors.TokenNotProvidedError();
      };
  
      const token = authorization.replace('Bearer ','')
  
      const user: {
        id: string,
        username: string,
        role: UserRole
        iat: number,
        exp: number,
      } = await JwtTokenProvider.verifyToken(token, JwtPrivateKey, {});

      if (!accessRole.includes(user.role)) {
        throw new TokenProviderErrors.Unauthorized();
      }

      req['user'] = user;

      next()
    } catch (e) {
      let errorResponse;
      switch(e.constructor) {
        case TokenProviderErrors.TokenExpiredError:
          errorResponse = forbidden(new HttpError.AccessTokenExpired(e.errorValue()));
          break;
        case TokenProviderErrors.InvalidTokenPayload:
        case TokenProviderErrors.TokenMalformedError:
          errorResponse = forbidden(new HttpError.InvalidToken(e.errorValue()));
          break;
        case TokenProviderErrors.TokenExpiredError:
          errorResponse = forbidden(new HttpError.AccessTokenExpired(e.errorValue()));
          break;
        case TokenProviderErrors.TokenNotProvidedError:
          errorResponse = forbidden(new HttpError.TokenNotProvided(e.errorValue()))
          break;
        default:
          errorResponse = fail(new HttpError.InternalServerError(e.errorValue()));
          break;
      }
  
      res
        .status(errorResponse.statusCode)
        .json(JSON.parse(errorResponse.body))
    }
  }
}
