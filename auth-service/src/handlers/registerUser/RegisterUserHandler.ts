import {Request, Response} from 'express';
import CompositionRoot from '../../../core/src/application-service/CompositionRoot';
import {RegisterUserDTO, RegisterUserErrors} from '../../../core/src/modules/user/use-cases/commands/RegisterUserUseCase';
import {
  RegisterUserBody,
  ResponseRegisterUserRequestProps
} from './RequestResponse';
import {IAPIGatewayResponse, forbidden, badRequest, fail} from '../../../core/src/common/responses/HandlerResponse';
import {HttpError} from '../../../core/src/common/responses/HttpError';
import {ApplicationError} from '../../../core/src/errors/ApplicationError';

async function registerUser(
  req: Request,
  res: Response,
): Promise<void> {
  CompositionRoot.composeApplication();

  const service = CompositionRoot.getUserApplicationService();

  const logger = CompositionRoot.getLoggerManager().getLogger(
    'UserService/RegisterUser',
  );
  
  const methodName = 'handler';
  const traceId = CompositionRoot.getTraceId();

  logger.trace({methodName, traceId}, 'BEGIN');

  const args: RegisterUserBody = req.body;

  const dto: RegisterUserDTO = args;

  const newUserRegister = await service.registerUser(dto);

  let response: IAPIGatewayResponse;

  if (newUserRegister.isLeft()) {
    const error = newUserRegister.value;
    switch (error.constructor) {
      case RegisterUserErrors.InvalidRoleAccess:
        response = forbidden(new HttpError.ForbiddenError(error.errorValue()));
        break;
      case RegisterUserErrors.UsernameAlreadyExists:
        response = forbidden(new HttpError.UsernameAlreadyExistsError(error.errorValue()));
        break;
      case ApplicationError.ValidationError:
        response = badRequest(new HttpError.ValidationError(error.errorValue()));
        break;
      default:
        response = fail(new HttpError.InternalServerError(error.errorValue()));
        break;
    }
  } else {
    response = {
      statusCode: 200,
      body: JSON.stringify(
        newUserRegister.value.getValue() as ResponseRegisterUserRequestProps,
      ),
    };

    logger.trace({methodName, traceId}, 'END');
  }

  res
    .status(response.statusCode)
    .json(JSON.parse(response.body))
}

export default registerUser;
