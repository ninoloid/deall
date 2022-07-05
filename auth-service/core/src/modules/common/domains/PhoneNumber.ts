import joi from 'joi';
import {ValueObject} from '../../../domain/ValueObject';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface PhoneNumberProps {
  value: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  private static SCHEMA = joi.alternatives([
    joi.string()
      .required()
      .min(9)
      .regex(/^\+628\d{7,}$/),
    joi.string()
      .required()
      .min(7)
      .regex(/^\+62\d{5,}$/),
    joi.allow(''),
  ]);

  get value(): string {
    return this.props.value;
  }

  private constructor(props: PhoneNumberProps) {
    super(props);
  }

  public static create(phoneNumber: string): Result<PhoneNumber> {
    const guardResult = Guard.againstSchema(this.SCHEMA, phoneNumber);

    if (!guardResult.succeeded) {
      return Result.fail(
        new DomainError(guardResult.message!, guardResult.errors),
      );
    } else {
      return Result.ok(
        new PhoneNumber({
          value: phoneNumber,
        }),
      );
    }
  }
}
