import {RegisterUserDTO, RegisterUserResponse} from '../../modules/user/use-cases/Commands/RegisterUserUseCase';
import {UserDetailDTO, UserDetailResponse} from '../../modules/user/use-cases/queries/UserDetailUseCase';
import {UserLoginDTO, UserLoginResponse} from '../../modules/user/use-cases/queries/UserLoginUseCase';

export interface IUserApplicationService {
  // User Commands
  registerUser(dto: RegisterUserDTO): Promise<RegisterUserResponse>;
  userLogin(dto: UserLoginDTO): Promise<UserLoginResponse>;

  // User Queries
  userDetail(dto: UserDetailDTO): Promise<UserDetailResponse>;
}
