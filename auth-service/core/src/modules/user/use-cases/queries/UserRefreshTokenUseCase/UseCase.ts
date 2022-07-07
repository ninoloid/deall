import joi from 'joi';
import CompositionRoot from '../../../../../application-service/CompositionRoot';
import {BaseUseCase} from '../../../../../domain/BaseUseCase';
import {ApplicationError} from '../../../../../errors/ApplicationError';
import {Guard} from '../../../../../logic/Guard';
import {Either, left, Result, right} from '../../../../../logic/Result';
import {UserRefreshTokenDTO, UserRefreshTokenErrors} from '.';
import {IAuthService} from '../../../../auth/services/IAuthService';
import {JSONUserTokenVM, UserTokenVM} from '../../../vms/UserTokenVM';
import {UserRole} from '../../../../../common/Constants';

type Response = Either<
  | ApplicationError.UnexpectedError
  | ApplicationError.ValidationError,
  Result<UserRefreshTokenUseCaseResponse>
>;

export type UserRefreshTokenResponse = Response;

export type UserRefreshTokenUseCaseResponse = JSONUserTokenVM;

export class UserRefreshTokenUseCase extends BaseUseCase<
  UserRefreshTokenDTO,
  UserRefreshTokenResponse
> {

  private SCHEMA = joi.object<UserRefreshTokenDTO>({
    token: joi.string().required(),
    user: joi.object({
      id: joi.string().required(),
      username: joi.string().required(),
      role: joi.valid(...Object.values(UserRole)).required(),
      iat: joi.optional(),
      exp: joi.optional(),
    })
  }).optional();

  constructor(
    protected authService: IAuthService,
  ) {
    super('UserRefreshTokenUseCase');
  }

  async execute(
    req: UserRefreshTokenDTO,
  ): Promise<UserRefreshTokenResponse> {
    const methodName = 'execute';
    const traceId = CompositionRoot.getTraceId();
    this.logger.trace({methodName, traceId}, 'BEGIN');

    const guardResult = Guard.againstSchema<UserRefreshTokenDTO>(
      this.SCHEMA,
      req,
    );
    if (!guardResult.succeeded) {
      return left(
        new ApplicationError.ValidationError(
          guardResult.message!,
          guardResult.errors,
        ),
      );
    }
    const dto = guardResult.value!;

    try {
      const {user, token} = req;

      const authToken = await this.authService.generateAccessToken(
        user.id,
        user.username,
        user.role as UserRole,
        token,
      );

      const authTokenOrError = UserTokenVM.create({
        username: user.username,

        accessToken: authToken.accessToken,
        accessTokenExpire: authToken.accessTokenExpired,

        refreshToken: authToken.refreshToken,
        refreshTokenExpire: authToken.refreshTokenExpired,
      })

      if (authTokenOrError.isFailure) {
        throw authTokenOrError.errorValue();
      }

      const jsonAuthToken = authTokenOrError.getValue().toJSON();

      this.logger.trace({methodName, traceId}, 'END');

      return right(Result.ok<UserRefreshTokenUseCaseResponse>(jsonAuthToken));
    } catch (e) {
      const err = e as Error;
      return left(new ApplicationError.UnexpectedError(e as Error));
    }
  }
}
