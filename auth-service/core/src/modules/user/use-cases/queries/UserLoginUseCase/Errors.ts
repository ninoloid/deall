import {UseCaseError} from '../../../../../errors/UseCaseError';
import {Result} from '../../../../../logic/Result';

export namespace UserLoginErrors {
  export class InvalidUsernameOrPassword extends Result<UseCaseError> {
    constructor() {
      super(false, new UseCaseError(`Invalid username or password`));
    }
  }
}
