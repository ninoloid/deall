import {Request, Response} from 'express';
import CompositionRoot from '../../../core/src/application-service/CompositionRoot';
import {UserLoginDTO, UserLoginErrors} from '../../../core/src/modules/user/use-cases/queries/UserLoginUseCase';
import {
  UserLoginBody,
  ResponseUserLoginRequestProps
} from './RequestResponse';
import {IAPIGatewayResponse, forbidden, badRequest, fail, notFound} from '../../../core/src/common/responses/HandlerResponse';
import {HttpError} from '../../../core/src/common/responses/HttpError';
import {ApplicationError} from '../../../core/src/errors/ApplicationError';

async function userLogin(
  req: Request,
  res: Response,
): Promise<void> {
  CompositionRoot.composeApplication();

  const service = CompositionRoot.getUserApplicationService();

  const logger = CompositionRoot.getLoggerManager().getLogger(
    'UserService/UserLogin',
  );
  
  const methodName = 'handler';
  const traceId = CompositionRoot.getTraceId();

  logger.trace({methodName, traceId}, 'BEGIN');

  const body = req.body as unknown as UserLoginBody;

  const dto: UserLoginDTO = body;

  const newUserRegister = await service.userLogin(dto);

  let response: IAPIGatewayResponse;

  if (newUserRegister.isLeft()) {
    const error = newUserRegister.value;
    switch (error.constructor) {
      case UserLoginErrors.InvalidUsernameOrPassword:
        response = notFound(new HttpError.InvalidUsernamePasswordError(error.errorValue()));
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
        newUserRegister.value.getValue() as ResponseUserLoginRequestProps,
      ),
    };

    logger.trace({methodName, traceId}, 'END');
  }

  res
    .status(response.statusCode)
    .json(JSON.parse(response.body))
}

export default userLogin;
