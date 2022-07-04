import {isNil, omitBy} from 'lodash';
import {parse, StackFrame} from 'stack-trace';
import VError from 'verror';

export class BaseError extends VError {
  public readonly details?: ErrorDetails[];

  constructor(
    name: string,
    message: string,
    cause?: Error,
    details?: ErrorDetails[],
  ) {
    super({cause, name}, message);
    this.details = details;
  }

  getStackTrace(): StackFrame[] {
    return parse(this)
      .map((x) => omitBy(x, isNil) as StackFrame)
      .filter((x: StackFrame) => {
        return x.getFileName() && x.getFileName().indexOf('.js') <= 0;
      });
  }
}

export interface ErrorDetails {
  message: string;
  path: Array<string | number>;
}
