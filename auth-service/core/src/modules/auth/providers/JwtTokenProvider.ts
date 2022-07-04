import {decode, sign, SignOptions, verify, VerifyErrors} from 'jsonwebtoken';
import {BaseProvider} from '../../../providers/BaseProvider';
import {ITokenProvider, VerifyOption} from './ITokenProvider';
import {TokenProviderErrors} from './TokenProviderErrors';

export class JwtTokenProvider extends BaseProvider implements ITokenProvider {
  constructor() {
    super('JwtTokenProvider');
  }

  async signToken<T>(
    payload: T,
    secret: string,
    options?: SignOptions,
  ): Promise<string> {
    return sign(payload as Record<string, unknown>, secret, options);
  }

  async verifyToken<T>(
    token: string,
    secret: string,
    options?: VerifyOption,
  ): Promise<T> {
    try {
      const data = verify(token, secret, options);

      return (data as unknown) as T;
    } catch (e: unknown) {
      const error = e as VerifyErrors;
      if (error.name === 'JsonWebTokenError') {
        throw new TokenProviderErrors.TokenMalformedError();
      }

      if (error.name === 'TokenExpiredError') {
        throw new TokenProviderErrors.TokenExpiredError();
      }

      throw error;
    }
  }

  decodeToken<T>(token: string): T {
    const result = decode(token);

    if (result === null) {
      throw new TokenProviderErrors.TokenMalformedError();
    }

    return decode(token) as T;
  }
}
