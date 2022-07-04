import {SignOptions, VerifyOptions} from 'jsonwebtoken';

export interface ITokenProvider {
  signToken<T>(
    payload: T,
    secret: string,
    options: SignOptions,
  ): Promise<string>;
  verifyToken<T>(
    token: string,
    secret: string,
    options: VerifyOption,
  ): Promise<T>;

  decodeToken<T>(token: string): T;
}

export interface TokenOptions {
  expiresIn?: string | number;
  algorithm?: string;
}

export interface VerifyOption extends VerifyOptions {
  algorithm?: string[];
}
