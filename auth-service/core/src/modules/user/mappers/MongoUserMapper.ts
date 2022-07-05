import {UserRole} from '../../../common/Constants';
import {StaticImplements} from '../../../domain/decorators/StaticImplements';
import {Mapper} from '../../../domain/Mapper';
import {EmailAddress} from '../../common/domains/EmailAddress';
import {PhoneNumber} from '../../common/domains/PhoneNumber';
import {User} from '../domains/User';

export interface MongoUserProps {
  username: string;
  password: string;
  role: string;

  name: string;
  email: string;
  phone?: string;
}

@StaticImplements<Mapper<User, MongoUserProps>>()
export class MongoUserMapper {
  public static toDomain(props: MongoUserProps): User {
    const emailOrError = EmailAddress.create(props.email);
    if (emailOrError.isFailure) {
      throw emailOrError.errorValue();
    }
    const email = emailOrError.getValue();

    let phone: PhoneNumber | undefined;

    if (props.phone) {
      const phoneNumberOrError = PhoneNumber.create(props.phone);
      if (phoneNumberOrError.isFailure) {
        throw phoneNumberOrError.errorValue();
      }
      phone = phoneNumberOrError.getValue();
    }

    const userOrError = User.create(
      {
        username: props.username,
        password: props.password,
        role: props.role as UserRole,

        name: props.name,
        email: email,
        phone: phone,
      }
    );

    if (userOrError.isFailure) {
      throw userOrError.errorValue();
    } else {
      return userOrError.getValue();
    }
  }

  public static toPersistence(domain: User): MongoUserProps {
    return {
      username: domain.username,
      password: domain.password,
      role: domain.role,

      name: domain.name,
      email: domain.email.value,
      phone: domain.phone.value,
    };
  }
}
