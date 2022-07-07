import {UserDecodedToken} from '../../../../../../../src/middlewares/auth';

export interface UserRefreshTokenDTO {
  token: string;
  user: UserDecodedToken
}
