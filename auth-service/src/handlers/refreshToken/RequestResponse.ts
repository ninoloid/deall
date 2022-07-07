import {UserRefreshTokenUseCaseResponse, UserRefreshTokenDTO} from '../../../core/src/modules/user/use-cases/queries/UserRefreshTokenUseCase';

export type ResponseUserRefreshTokenRequestProps = UserRefreshTokenUseCaseResponse;

export type UserRefreshTokenBody = Omit<UserRefreshTokenDTO, 'token'>;
