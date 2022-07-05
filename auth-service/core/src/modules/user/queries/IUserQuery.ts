import {UserCredentialVM} from '../vms/UserCredentialVM';
import {UserDetailVM} from '../vms/UserDetailVM';

export interface IUserQuery {
  getUserDetailById(id: string): Promise<UserDetailVM | undefined>;
  getUserCredentialByUsername(username: string): Promise<UserCredentialVM | undefined>;
}
