import {User} from '../domains/User';

export interface IUserRepository {
  create(cart: User): Promise<void>;
}
