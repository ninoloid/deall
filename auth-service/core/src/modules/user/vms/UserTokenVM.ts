import joi from 'joi';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface UserTokenVMProps {
  readonly username: string;

  readonly token: string;
  readonly tokenExpire: number;

  readonly refreshToken: string;
  readonly refreshTokenExpire: number;
}

export interface JSONUserTokenVM {
  readonly username: string;

  readonly token: string;
  readonly tokenExpire: number;

  readonly refreshToken: string;
  readonly refreshTokenExpire: number;
}

export class UserTokenVM {
  private constructor(public props: UserTokenVMProps) {}

  private static SCHEMA = joi.object<UserTokenVMProps>({
    username: joi.string().required(),

    token: joi.string().required(),
    tokenExpire: joi.number().required(),

    refreshToken: joi.string().required(),
    refreshTokenExpire: joi.number().required(),
  }).required();

  public toJSON(): JSONUserTokenVM {
    return {
      username: this.props.username,

      token: this.props.token,
      tokenExpire: this.props.tokenExpire,

      refreshToken: this.props.refreshToken,
      refreshTokenExpire: this.props.refreshTokenExpire,
    };
  }

  public static create(
    props: UserTokenVMProps,
  ): Result<UserTokenVM> {
    const guardResult = Guard.againstSchema<UserTokenVMProps>(
      this.SCHEMA,
      props,
    );
    if (!guardResult.succeeded) {
      return Result.fail(
        new DomainError(guardResult.message!, guardResult.errors),
      );
    } else {
      props = guardResult.value!;

      const userToken = new UserTokenVM({
        ...props,
      });

      return Result.ok(userToken);
    }
  }
}
