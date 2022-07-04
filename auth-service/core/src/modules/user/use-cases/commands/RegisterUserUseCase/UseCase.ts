import joi from 'joi';
import CompositionRoot from '../../../../../application-service/CompositionRoot';
import {BaseUseCase} from '../../../../../domain/BaseUseCase';
import {UniqueEntityId} from '../../../../../domain/UniqueEntityId';
import {ApplicationError} from '../../../../../errors/ApplicationError';
import {Guard} from '../../../../../logic/Guard';
import {Either, left, Result, right} from '../../../../../logic/Result';
import {User} from '../../../domains/User';
import {IUserService} from '../../../services/IUserService';
import {RegisterUserDTO, RegisterUserErrors} from './';

type Response = Either<
  | ApplicationError.UnexpectedError
  | ApplicationError.ValidationError
  | RegisterUserErrors.InvalidRoleAccess
  | RegisterUserErrors.UsernameAlreadyExists,
  Result<RegisterUserUseCaseResponse>
>;

export type RegisterUserResponse = Response;

export type RegisterUserUseCaseResponse = {
  message: string;
};

export class RegisterUserUseCase extends BaseUseCase<
  RegisterUserDTO,
  RegisterUserResponse
> {

  private SCHEMA = joi.object<RegisterUserDTO>({
    username: joi.string().required(),
    password: joi.string().required(),

    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().optional(),
  }).required();

  constructor(protected userService: IUserService) {
    super('RegisterUserUseCase');
  }

  async execute(
    req: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    const methodName = 'execute';
    const traceId = CompositionRoot.getTraceId();
    this.logger.trace({methodName, traceId}, 'BEGIN');

    const guardResult = Guard.againstSchema<RegisterUserDTO>(
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
      const userOrError = User.create({
        username: dto.username,
        password: dto.password,

        name: dto.name,
        email: dto.email,
        phone: dto.phone,
      });

      if (userOrError.isFailure) {
        return left(
          new ApplicationError.ValidationError(
            userOrError.errorValue().message,
            userOrError.errorValue().details,
          ),
        );
      }

      const createdUser = userOrError.getValue();
      await this.userService.createUser(createdUser);

      const response = {
        message: 'User registered successfully',
      };

      this.logger.trace({methodName, traceId}, 'END');

      return right(Result.ok<RegisterUserUseCaseResponse>(response));
    } catch (e) {
      const err = e as Error;
      return left(new ApplicationError.UnexpectedError(e as Error));
    }
  }
}
