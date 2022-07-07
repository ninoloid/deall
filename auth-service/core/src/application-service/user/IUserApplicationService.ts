import {RegisterUserDTO, RegisterUserResponse} from '../../modules/user/use-cases/commands/RegisterUserUseCase';
import {UserDetailDTO, UserDetailResponse} from '../../modules/user/use-cases/queries/UserDetailUseCase';
import {UserLoginDTO, UserLoginResponse} from '../../modules/user/use-cases/queries/UserLoginUseCase';
import { UserRefreshTokenDTO, UserRefreshTokenResponse } from '../../modules/user/use-cases/queries/UserRefreshTokenUseCase';

export interface IUserApplicationService {
  // User Commands
  registerUser(dto: RegisterUserDTO): Promise<RegisterUserResponse>;
  
  // User Queries
  userDetail(dto: UserDetailDTO): Promise<UserDetailResponse>;
  userLogin(dto: UserLoginDTO): Promise<UserLoginResponse>;
  userRefreshToken(dto: UserRefreshTokenDTO): Promise<UserRefreshTokenResponse>;
}
