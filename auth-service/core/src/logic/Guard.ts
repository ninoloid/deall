import {Schema} from 'joi';
import {ErrorDetails} from '../errors/BaseError';

export interface IGuardResult<T> {
  succeeded: boolean;
  value?: T;
  message?: string;
  errors?: ErrorDetails[];
}

export class Guard {
  public static combine<T>(guardResults: IGuardResult<T>[]): IGuardResult<T> {
    for (const result of guardResults) {
      if (result.succeeded === false) return result;
    }

    return {succeeded: true, message: undefined};
  }

  public static againstSchema<T>(schema: Schema, value: any): IGuardResult<T> {
    const result = schema.validate(value, {abortEarly: false});
    if (result.error) {
      return {
        succeeded: false,
        message: result.error.message,
        errors: result.error?.details,
      };
    } else {
      return {succeeded: true, value: result.value as T};
    }
  }
}
