import joi from 'joi';
import {ValueObject} from '../../../domain/ValueObject';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface AuthenticationTokenProps {
  accessToken?: string;
  refreshToken?: string;

  accessTokenExpired?: Date;
  refreshTokenExpired?: Date;
}

export class AuthenticationToken extends ValueObject<AuthenticationTokenProps> {
  private static SCHEMA = joi.object({
    accessToken: joi.string().optional(),
    refreshToken: joi.string().optional(),

    accessTokenExpired: joi.date().optional(),
    refreshTokenExpired: joi.date().optional(),
  }).required();

  get accessToken(): string {
    return this.props.accessToken!;
  }

  get refreshToken(): string {
    return this.props.refreshToken!;
  }

  get accessTokenExpired(): Date {
    return this.props.accessTokenExpired!;
  }

  get refreshTokenExpired(): Date {
    return this.props.refreshTokenExpired!;
  }

  private constructor(props: AuthenticationTokenProps) {
    super(props);
  }

  public static create(
    props: AuthenticationTokenProps,
  ): Result<AuthenticationToken> {
    const guardResult = Guard.againstSchema(this.SCHEMA, props);

    if (!guardResult.succeeded) {
      return Result.fail(
        new DomainError(guardResult.message!, guardResult.errors),
      );
    } else {
      return Result.ok(
        new AuthenticationToken({
          ...props,
        }),
      );
    }
  }
}
