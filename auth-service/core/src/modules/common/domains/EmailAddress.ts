import joi from 'joi';
import {toLower} from 'lodash';
import {ValueObject} from '../../../domain/ValueObject';
import {DomainError} from '../../../errors/DomainError';
import {Guard} from '../../../logic/Guard';
import {Result} from '../../../logic/Result';

export interface EmailAddressProps {
  value: string;
}

export class EmailAddress extends ValueObject<EmailAddressProps> {
  private static SCHEMA = joi.string().email().required();

  get value(): string {
    return this.props.value;
  }

  public transformToFirstNameLastName(): {
    firstName: string;
    lastName: string;
  } {
    const emailValue = this.value;

    const baseName = emailValue.split('@')[0];

    const splitName = baseName.split('.');

    const length = splitName.length;

    const firstName = splitName[0] || '';
    const lastName = length > 1 ? splitName[length - 1] : '';

    return {
      firstName,
      lastName,
    };
  }

  private constructor(props: EmailAddressProps) {
    super(props);
  }

  public static create(address: string): Result<EmailAddress> {
    const guardResult = Guard.againstSchema(this.SCHEMA, address);

    if (!guardResult.succeeded) {
      return Result.fail(
        new DomainError(guardResult.message!, guardResult.errors),
      );
    } else {
      return Result.ok(
        new EmailAddress({
          value: toLower(address),
        }),
      );
    }
  }
}
