import {UseCaseError} from '../../../../../errors/UseCaseError';
import {Result} from '../../../../../logic/Result';

export namespace UserDetailErrors {
  export class InvalidRoleAccess extends Result<UseCaseError> {
    constructor() {
      super(false, new UseCaseError(`Your role did not have access`));
    }
  }

  export class UserNotFound extends Result<UseCaseError> {
    constructor(id: string) {
      super(false, new UseCaseError(`User with id ${id} not found`));
    }
  }
}
