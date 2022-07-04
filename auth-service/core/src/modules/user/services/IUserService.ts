import {User} from '../domains/User';

export interface IUserService {
  createUser(user: User): Promise<void>;
}
