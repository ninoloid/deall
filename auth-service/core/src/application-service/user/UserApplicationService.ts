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
import { UserLoginDTO, UserLoginResponse, UserLoginUseCase } from '../../modules/user/use-cases/queries/UserLoginUseCase';
import {IUserApplicationService} from './IUserApplicationService';

export interface UserApplicationUseCase {
  // User Commands
  registerUser: RegisterUserUseCase;
  userLogin: UserLoginUseCase;
  
  // User Queries
  userDetail: UserDetailUseCase;
}

export class UserApplicationService implements IUserApplicationService {
  constructor(protected useCases: UserApplicationUseCase) {}
  // User Queries
  registerUser(dto: RegisterUserDTO): Promise<RegisterUserResponse> {
    return this.useCases.registerUser.execute(dto);
  } 
  userLogin(dto: UserLoginDTO): Promise<UserLoginResponse> {
    return this.useCases.userLogin.execute(dto);
  }

  // User Commands
  userDetail(dto: UserDetailDTO): Promise<UserDetailResponse> {
    return this.useCases.userDetail.execute(dto);
  }
}
