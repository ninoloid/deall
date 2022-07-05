import { UserRole } from '../../../common/Constants';
import {StaticImplements} from '../../../domain/decorators/StaticImplements';
import {Mapper} from '../../../domain/Mapper';
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
    const cartOrError = User.create(
      {
        username: props.username,
        password: props.password,
        role: props.role as UserRole,

        name: props.name,
        email: props.email,
        phone: props.phone,
      }
    );

    if (cartOrError.isFailure) {
      throw cartOrError.errorValue();
    } else {
      return cartOrError.getValue();
    }
  }

  public static toPersistence(domain: User): MongoUserProps {
    return {
      username: domain.username,
      password: domain.password,
      role: domain.role,

      name: domain.name,
      email: domain.email,
      phone: domain.phone,
    };
  }
}
