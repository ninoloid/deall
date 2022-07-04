import {isNil, omit, omitBy} from 'lodash';
import {parse, StackFrame} from 'stack-trace';
import VError from 'verror';
import CompositionRoot from '../../application-service/CompositionRoot';
import {ErrorStack} from '../../errors/ErrorStack';
import {UseCaseError} from '../../errors/UseCaseError';
import {HttpBaseError} from './HttpBaseError';
import {HttpError} from './HttpError';
import {HttpStatusCode} from './HttpStatusCode';

export function parseErrorBody(
  error: HttpBaseError,
): IAPIGatewayErrorResponseBody {
  const errorStack =
    process.env.PTK_NODE_ENV === 'development'
      ? parseErrorStack(error)
      : undefined;

  return {
    code: error.code ? error.code : undefined,
    message: error.message,
    details: error.details
      ? error.details.map((x) => omit(x, ['type', 'context']))
      : undefined,
    traceId: CompositionRoot.getTraceId(),
    stackTrace: errorStack,
  };
}

export function parseErrorStack(error: VError | Error): ErrorStack | undefined {
  const stack: ErrorStack = {
    name: error.name,
    details: error instanceof UseCaseError ? error.details : undefined,
    message: error.message,
    traces: parse(error)
      .map((x) => omitBy(x, isNil) as StackFrame)
      .filter((x: StackFrame) => {
        return x.getFileName() && x.getFileName().indexOf('.js') <= 0;
      }),
  };

  if (error instanceof VError) {
    const cause = error.cause();
    if (cause) {
      stack.cause = parseErrorStack(cause);
    }
  }

  return stack;
}

export function ok<T>(dto?: T): IAPIGatewayResponse {
  const response: IAPIGatewayResponse = {
    statusCode: HttpStatusCode.Ok,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(dto ? dto : undefined),
  };

  if (!dto) {
    response.statusCode = HttpStatusCode.NoContent;
  }

  return response;
}

export function created<T>(dto?: T): IAPIGatewayResponse {
  return {
    statusCode: HttpStatusCode.Created,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(dto ? dto : undefined),
  };
}

export function unauthorized(error: HttpBaseError): IAPIGatewayResponse {
  return {
    statusCode: HttpStatusCode.Unauthorized,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(parseErrorBody(error)),
  };
}

export function conflict(error: HttpBaseError): IAPIGatewayResponse {
  return {
    statusCode: HttpStatusCode.Conflict,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(parseErrorBody(error)),
  };
}

export function notFound(error: HttpBaseError): IAPIGatewayResponse {
  return {
    statusCode: HttpStatusCode.NotFound,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(parseErrorBody(error)),
  };
}

export function badRequest(error: HttpBaseError): IAPIGatewayResponse {
  return {
    statusCode: HttpStatusCode.BadRequest,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(parseErrorBody(error)),
  };
}

export function fail(error: HttpBaseError): IAPIGatewayResponse {
  return {
    statusCode: HttpStatusCode.InternalServerError,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(parseErrorBody(error)),
  };
}

export function forbidden(
  error: HttpError.AuthorizationError,
): IAPIGatewayResponse {
  return {
    statusCode: HttpStatusCode.Forbidden,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(parseErrorBody(error)),
  };
}

export function redirect(url: string): IAPIGatewayResponse {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Expose-Headers': '*',
      'Access-Control-Allow-Credential': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      Location: url,
    },
    statusCode: 302,
  };
}

export interface IAPIGatewayResponse {
  statusCode: HttpStatusCode;
  body?: any;
  headers?: any;
}

export interface IAPIGatewayErrorResponseBody {
  code?: number;
  message?: string;
  details?: any[];
  traceId?: any;
  stackTrace?: any;
}
