import {
  RegisterUserDTO,
  RegisterUserResponse,
  RegisterUserUseCase
} from '../../modules/user/use-cases/commands/RegisterUserUseCase';
import {
  UserDetailDTO,
  UserDetailResponse,
  UserDetailUseCase
} from '../../modules/user/use-cases/queries/UserDetailUseCase';
import {
  UserLoginDTO,
  UserLoginResponse,
  UserLoginUseCase
} from '../../modules/user/use-cases/queries/UserLoginUseCase';
import { UserRefreshTokenDTO, UserRefreshTokenResponse, UserRefreshTokenUseCase } from '../../modules/user/use-cases/queries/UserRefreshTokenUseCase';
import {IUserApplicationService} from './IUserApplicationService';

export interface UserApplicationUseCase {
  // User Commands
  registerUser: RegisterUserUseCase;
  
  // User Queries
  userDetail: UserDetailUseCase;
  userLogin: UserLoginUseCase;
  userRefreshToken: UserRefreshTokenUseCase;
}

export class UserApplicationService implements IUserApplicationService {
  constructor(protected useCases: UserApplicationUseCase) {}
  // User Commands
  registerUser(dto: RegisterUserDTO): Promise<RegisterUserResponse> {
    return this.useCases.registerUser.execute(dto);
  } 
  
  // User Queries
  userDetail(dto: UserDetailDTO): Promise<UserDetailResponse> {
    return this.useCases.userDetail.execute(dto);
  }
  userLogin(dto: UserLoginDTO): Promise<UserLoginResponse> {
    return this.useCases.userLogin.execute(dto);
  }
  userRefreshToken(dto: UserRefreshTokenDTO): Promise<UserRefreshTokenResponse> {
    return this.useCases.userRefreshToken.execute(dto);
  }
}
