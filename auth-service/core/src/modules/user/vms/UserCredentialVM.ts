import joi from 'joi';
import { UserRole } from '../../../common/Constants';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface UserCredentialVMProps {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly role: string;
}

export interface JSONUserCredentialVM {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly role: string;
}

export class UserCredentialVM {
  private constructor(public props: UserCredentialVMProps) {}

  private static SCHEMA = joi.object<UserCredentialVMProps>({
    id: joi.string().hex().length(24).required(),
    username: joi.string().required(),
    password: joi.string().required(),
    role: joi.valid(...Object.values(UserRole)).required(),
  }).required();

  public toJSON(): JSONUserCredentialVM {
    return {
      id: this.props.id,
      username: this.props.username,
      password: this.props.password,
      role: this.props.role,
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
