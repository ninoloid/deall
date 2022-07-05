import joi from 'joi';
import CompositionRoot from '../../../../../application-service/CompositionRoot';
import {BaseUseCase} from '../../../../../domain/BaseUseCase';
import {ApplicationError} from '../../../../../errors/ApplicationError';
import {Guard} from '../../../../../logic/Guard';
import {Either, left, Result, right} from '../../../../../logic/Result';
import {User} from '../../../domains/User';
import {IUserService} from '../../../services/IUserService';
import {RegisterUserDTO, RegisterUserErrors} from './';
import {UserRole} from '../../../../../common/Constants';
import {EmailAddress} from '../../../../common/domains/EmailAddress';
import {PhoneNumber} from '../../../../common/domains/PhoneNumber';
import { hashPasswd } from '../../../../../common/util/Bcrypt';

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
    role: joi.valid(...Object.values(UserRole)).required(),
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
      const usernameExists = await this.userService.isUsernameExists(dto.username);

      if (usernameExists) {
        return left(
          new RegisterUserErrors.UsernameAlreadyExists(dto.username)
        )
      }

      const emailOrError = EmailAddress.create(dto.email);

      if (emailOrError.isFailure) {
        return left(
          new RegisterUserErrors.InvalidEmailFormat()
        )
      }

      const email = emailOrError.getValue();

      let phone: PhoneNumber | undefined;

      if (dto.phone) {
        const phoneNumberOrError = PhoneNumber.create(dto.phone);
        if (phoneNumberOrError.isFailure) {
          return left(
            new RegisterUserErrors.InvalidPhoneFormat()
          )
        }
        phone = phoneNumberOrError.getValue();
      }

      const password = hashPasswd(dto.password);

      const userOrError = User.create({
        username: dto.username,
        password,
        role: dto.role,

        name: dto.name,
        email,
        phone,
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
