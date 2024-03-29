import {UseCaseError} from '../../../../../errors/UseCaseError';
import {Result} from '../../../../../logic/Result';

export namespace RegisterUserErrors {
  export class InvalidRoleAccess extends Result<UseCaseError> {
    constructor() {
      super(false, new UseCaseError(`Your role did not have access`));
    }
  }

  export class UsernameAlreadyExists extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, new UseCaseError(`Username ${username} already exists`));
    }
  }

  export class InvalidEmailFormat extends Result<UseCaseError> {
    constructor() {
      super(false, new UseCaseError(`Invalid Email Format`));
    }
  }

  export class InvalidPhoneFormat extends Result<UseCaseError> {
    constructor() {
      super(false, new UseCaseError(`Invalid Phone Format`));
    }
  }
}
