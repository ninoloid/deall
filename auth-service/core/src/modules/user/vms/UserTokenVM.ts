import joi from 'joi';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';
import {DateUtil} from '../../../common/util/DateUtil';
export interface UserTokenVMProps {
  readonly username: string;

  readonly accessToken: string;
  readonly accessTokenExpire: Date;

  readonly refreshToken: string;
  readonly refreshTokenExpire: Date;
}

export interface JSONUserTokenVM {
  readonly username: string;

  readonly accessToken: string;
  readonly accessTokenExpire: number;

  readonly refreshToken: string;
  readonly refreshTokenExpire: number;
}

export class UserTokenVM {
  private constructor(public props: UserTokenVMProps) {}

  private static SCHEMA = joi.object<UserTokenVMProps>({
    username: joi.string().required(),

    accessToken: joi.string().required(),
    accessTokenExpire: joi.date().required(),

    refreshToken: joi.string().required(),
    refreshTokenExpire: joi.date().required(),
  }).required();

  public toJSON(): JSONUserTokenVM {
    return {
      username: this.props.username,

      accessToken: this.props.accessToken,
      accessTokenExpire: DateUtil.DateToUnixSeconds(this.props.accessTokenExpire),

      refreshToken: this.props.refreshToken,
      refreshTokenExpire: DateUtil.DateToUnixSeconds(this.props.refreshTokenExpire),
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
