import joi from 'joi';
import {Entity} from '../../../domain/Entity';
import {UniqueEntityId} from '../../../domain/UniqueEntityId';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface UserProps {
  username: string;
  password: string;

  name: string;
  email: string;
  phone?: string;
}

export class User extends Entity<UserProps> {
  private static SCHEMA = joi.object<UserProps>({
    username: joi.string().required(),
    password: joi.string().required(),

    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().optional(),
  }).required();

  get id(): UniqueEntityId {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  setUsername(value: string) {
    this.props.username = value;
    return Result.ok();
  }

  setPassword(value: string) {
    this.props.password = value;
    return Result.ok();
  }

  setName(value: string) {
    this.props.name = value;
    return Result.ok();
  }

  setEmail(value: string) {
    this.props.email = value;
    return Result.ok();
  }

  setPhone(value: string) {
    this.props.phone = value;
    return Result.ok();
  }

  public static create(
    props: UserProps,
    id?: UniqueEntityId,
  ): Result<User> {
    const guardResult = Guard.againstSchema<UserProps>(this.SCHEMA, props);
    if (!guardResult.succeeded) {
      return Result.fail(
        new DomainError(guardResult.message!, guardResult.errors),
      );
    } else {
      props = guardResult.value!;
      const user = new User(
        {
          ...props,
        },
        id,
      );

      return Result.ok(user);
    }
  }
}
