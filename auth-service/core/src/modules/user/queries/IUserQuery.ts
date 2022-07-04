import {UserDetailVM} from '../vms/UserDetailVM';

export interface IUserQuery {
  getUserDetailById(id: string): Promise<UserDetailVM | undefined>;
}
