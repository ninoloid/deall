import {BaseError} from '../errors/BaseError';
import {InvalidOperationError} from '../errors/InvalidOperationError';

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: BaseError;
  private _value: T;

  public constructor(isSuccess: boolean, error?: BaseError, value?: T) {
    if (isSuccess && error) {
      throw new InvalidOperationError(
        'A result cannot be successful and contain an error',
      );
    }
    if (!isSuccess && !error) {
      throw new InvalidOperationError(
        'A failing result needs to contain an error',
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error!;
    this._value = value!;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new InvalidOperationError(
        `Can't get the value of an error result. Use 'errorValue' instead.`,
        this.error,
      );
    }

    return this._value;
  }

  public errorValue(): BaseError {
    return this.error;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: any): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
