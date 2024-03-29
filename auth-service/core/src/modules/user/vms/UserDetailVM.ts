import joi from 'joi';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface UserDetailVMProps {
  readonly id: string;
  readonly username: string;

  readonly name: string;
  readonly email: string;
  readonly phone: string;
}

export interface JSONUserDetailVM {
  readonly id: string;
  readonly username: string;

  readonly name: string;
  readonly email: string;
  readonly phone: string;
}

export class UserDetailVM {
  private constructor(public props: UserDetailVMProps) {}

  private static SCHEMA = joi.object<UserDetailVMProps>({
    id: joi.string().hex().length(24).required(),

    username: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().optional(),
  }).required();

  public toJSON(): JSONUserDetailVM {
    return {
      id: this.props.id,

      username: this.props.username,
      name: this.props.name,
      email: this.props.email,
      phone: this.props.phone,
    };
  }

  public static create(
    props: UserDetailVMProps,
  ): Result<UserDetailVM> {
    const guardResult = Guard.againstSchema<UserDetailVMProps>(
      this.SCHEMA,
      props,
    );
    if (!guardResult.succeeded) {
      return Result.fail(
        new DomainError(guardResult.message!, guardResult.errors),
      );
    } else {
      props = guardResult.value!;

      const userDetails = new UserDetailVM({
        ...props,
      });

      return Result.ok(userDetails);
    }
  }
}
