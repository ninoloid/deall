import joi from 'joi';
import CompositionRoot from '../../../../../application-service/CompositionRoot';
import {BaseUseCase} from '../../../../../domain/BaseUseCase';
import {ApplicationError} from '../../../../../errors/ApplicationError';
import {Guard} from '../../../../../logic/Guard';
import {Either, left, Result, right} from '../../../../../logic/Result';
import {UserDetailDTO, UserDetailErrors} from '.';
import {IUserQuery} from '../../../queries/IUserQuery';
import {JSONUserDetailVM} from '../../../vms/UserDetailVM';

type Response = Either<
  | ApplicationError.UnexpectedError
  | ApplicationError.ValidationError
  | UserDetailErrors.InvalidRoleAccess
  | UserDetailErrors.UserNotFound,
  Result<UserDetailUseCaseResponse>
>;

export type UserDetailResponse = Response;

export type UserDetailUseCaseResponse = JSONUserDetailVM

export class UserDetailUseCase extends BaseUseCase<
  UserDetailDTO,
  UserDetailResponse
> {

  private SCHEMA = joi.object<UserDetailDTO>({
    id: joi.string().hex().length(24),
  }).required();

  constructor(protected userQuery: IUserQuery) {
    super('UserDetailUseCase');
  }

  async execute(
    req: UserDetailDTO,
  ): Promise<UserDetailResponse> {
    const methodName = 'execute';
    const traceId = CompositionRoot.getTraceId();
    this.logger.trace({methodName, traceId}, 'BEGIN');

    const guardResult = Guard.againstSchema<UserDetailDTO>(
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
      const user = await this.userQuery.getUserDetailById(dto.id)

      if (!user) {
        return left(
          new UserDetailErrors.UserNotFound(dto.id),
        );
      }

      const response = user.toJSON();

      this.logger.trace({methodName, traceId}, 'END');

      return right(Result.ok<UserDetailUseCaseResponse>(response));
    } catch (e) {
      const err = e as Error;
      return left(new ApplicationError.UnexpectedError(e as Error));
    }
  }
}
