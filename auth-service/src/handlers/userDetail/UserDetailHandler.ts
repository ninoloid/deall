import {Request, Response} from 'express';
import CompositionRoot from '../../../core/src/application-service/CompositionRoot';
import {UserDetailDTO, UserDetailErrors} from '../../../core/src/modules/user/use-cases/queries/UserDetailUseCase';
import {
  UserDetailParams,
  ResponseUserDetailRequestProps
} from './RequestResponse';
import {IAPIGatewayResponse, forbidden, badRequest, fail, notFound} from '../../../core/src/common/responses/HandlerResponse';
import {HttpError} from '../../../core/src/common/responses/HttpError';
import {ApplicationError} from '../../../core/src/errors/ApplicationError';
import { UserRole } from '../../../core/src/common/Constants';

async function userDetail(
  req: Request,
  res: Response,
): Promise<void> {
  CompositionRoot.composeApplication();

  const service = CompositionRoot.getUserApplicationService();

  const logger = CompositionRoot.getLoggerManager().getLogger(
    'UserService/UserDetail',
  );
  
  const methodName = 'handler';
  const traceId = CompositionRoot.getTraceId();

  logger.trace({methodName, traceId}, 'BEGIN');

  const params = req.params as unknown as UserDetailParams;

  const activeUser = req['user'];

  if (activeUser.role !== UserRole.ADMIN) {
    if (params.id !== activeUser.id) {
      const invalidUserError = forbidden(new HttpError.ForbiddenError())
      res
        .status(invalidUserError.statusCode)
        .json(JSON.parse(invalidUserError.body))

      return
    }
  }

  const dto: UserDetailDTO = params;

  const newUserRegister = await service.userDetail(dto);

  let response: IAPIGatewayResponse;

  if (newUserRegister.isLeft()) {
    const error = newUserRegister.value;
    switch (error.constructor) {
      case UserDetailErrors.InvalidRoleAccess:
        response = forbidden(new HttpError.ForbiddenError(error.errorValue()));
        break;
      case UserDetailErrors.UserNotFound:
        response = notFound(new HttpError.UserNotFoundError(error.errorValue()));
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
        newUserRegister.value.getValue() as ResponseUserDetailRequestProps,
      ),
    };

    logger.trace({methodName, traceId}, 'END');
  }

  res
    .status(response.statusCode)
    .json(JSON.parse(response.body))
}

export default userDetail;
