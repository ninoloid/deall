import {UserRole} from '../../../common/Constants';
import {AuthenticationToken} from '../../common/domains/AuthenticationToken';

export interface IAuthService {
  generateAuthenticationToken(
    userId: string,
    username: string,
    role: UserRole,
  ): Promise<AuthenticationToken>;

  generateAccessToken(
    userId: string,
    username: string,
    role: UserRole,
    refreshToken: string,
  ): Promise<AuthenticationToken>;
}
