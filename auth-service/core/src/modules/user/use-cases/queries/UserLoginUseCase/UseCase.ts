import joi from 'joi';
import CompositionRoot from '../../../../../application-service/CompositionRoot';
import {BaseUseCase} from '../../../../../domain/BaseUseCase';
import {UniqueEntityId} from '../../../../../domain/UniqueEntityId';
import {ApplicationError} from '../../../../../errors/ApplicationError';
import {Guard} from '../../../../../logic/Guard';
import {Either, left, Result, right} from '../../../../../logic/Result';
import {User} from '../../../domains/User';
import {IUserService} from '../../../services/IUserService';
import {UserLoginDTO, UserLoginErrors} from '.';
import {IUserQuery} from '../../../queries/IUserQuery';
import {JSONUserCredentialVM} from '../../../vms/UserCredentialVM';

type Response = Either<
  | ApplicationError.UnexpectedError
  | ApplicationError.ValidationError
  | UserLoginErrors.InvalidUsernameOrPassword,
  Result<UserLoginUseCaseResponse>
>;

export type UserLoginResponse = Response;

export type UserLoginUseCaseResponse = JSONUserCredentialVM

export class UserLoginUseCase extends BaseUseCase<
  UserLoginDTO,
  UserLoginResponse
> {

  private SCHEMA = joi.object<UserLoginDTO>({
    username: joi.string().required(),
    password: joi.string().required(),
  }).required();

  constructor(
    protected userQuery: IUserQuery,
    // protected authService: IAuthService,
  ) {
    super('UserLoginUseCase');
  }

  async execute(
    req: UserLoginDTO,
  ): Promise<UserLoginResponse> {
    const methodName = 'execute';
    const traceId = CompositionRoot.getTraceId();
    this.logger.trace({methodName, traceId}, 'BEGIN');

    const guardResult = Guard.againstSchema<UserLoginDTO>(
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
      const user = await this.userQuery.getUserCredentialByUsername(dto.username)

      if (!user) {
        return left(
          new UserLoginErrors.InvalidUsernameOrPassword(),
        );
      }

      const response = user.toJSON();

      this.logger.trace({methodName, traceId}, 'END');

      return right(Result.ok<UserLoginUseCaseResponse>(response));
    } catch (e) {
      const err = e as Error;
      return left(new ApplicationError.UnexpectedError(e as Error));
    }
  }
}
