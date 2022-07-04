import joi from 'joi';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface UserCredentialVMProps {
  readonly username: string;
  readonly password: string;
}

export interface JSONUserCredentialVM {
  readonly username: string;
  readonly password: string;
}

export class UserCredentialVM {
  private constructor(public props: UserCredentialVMProps) {}

  private static SCHEMA = joi.object<UserCredentialVMProps>({
    username: joi.string().required(),
    password: joi.string().required(),
  }).required();

  public toJSON(): JSONUserCredentialVM {
    return {
      username: this.props.username,
      password: this.props.password,
    };
  }

  public static create(
    props: UserCredentialVMProps,
  ): Result<UserCredentialVM> {
    const guardResult = Guard.againstSchema<UserCredentialVMProps>(
      this.SCHEMA,
      props,
    );
    if (!guardResult.succeeded) {
      return Result.fail(
        new DomainError(guardResult.message!, guardResult.errors),
      );
    } else {
      props = guardResult.value!;

      const userDetails = new UserCredentialVM({
        ...props,
      });

      return Result.ok(userDetails);
    }
  }
}
