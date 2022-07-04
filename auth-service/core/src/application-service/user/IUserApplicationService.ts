import {RegisterUserDTO, RegisterUserResponse} from '../../modules/user/use-cases/Commands/RegisterUserUseCase';
import {UserDetailDTO, UserDetailResponse} from '../../modules/user/use-cases/queries/UserDetailUseCase';

export interface IUserApplicationService {
  // User Commands
  registerUser(dto: RegisterUserDTO): Promise<RegisterUserResponse>;

  // User Queries
  userDetail(dto: UserDetailDTO): Promise<UserDetailResponse>;
}
