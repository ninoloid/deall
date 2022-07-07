import {Request, Response} from 'express';
import CompositionRoot from '../../../core/src/application-service/CompositionRoot';
import {UserRefreshTokenDTO, UserRefreshTokenErrors} from '../../../core/src/modules/user/use-cases/queries/UserRefreshTokenUseCase';
import {
  UserRefreshTokenBody,
  ResponseUserRefreshTokenRequestProps
} from './RequestResponse';
import {IAPIGatewayResponse, forbidden, badRequest, fail, notFound} from '../../../core/src/common/responses/HandlerResponse';
import {HttpError} from '../../../core/src/common/responses/HttpError';
import {ApplicationError} from '../../../core/src/errors/ApplicationError';

async function userRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  CompositionRoot.composeApplication();

  const service = CompositionRoot.getUserApplicationService();

  const logger = CompositionRoot.getLoggerManager().getLogger(
    'UserService/UserRefreshToken',
  );
  
  const methodName = 'handler';
  const traceId = CompositionRoot.getTraceId();

  logger.trace({methodName, traceId}, 'BEGIN');

  const {user} = req as unknown as UserRefreshTokenBody;
  const token = req.headers.authorization.replace('Bearer ','')

  const dto: UserRefreshTokenDTO = {
    token,
    user,
  };

  const newUserRegister = await service.userRefreshToken(dto);

  let response: IAPIGatewayResponse;

  if (newUserRegister.isLeft()) {
    const error = newUserRegister.value;
    switch (error.constructor) {
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
        newUserRegister.value.getValue() as ResponseUserRefreshTokenRequestProps,
      ),
    };

    logger.trace({methodName, traceId}, 'END');
  }

  res
    .status(response.statusCode)
    .json(JSON.parse(response.body))
}

export default userRefreshToken;
