import {ProviderError} from '../../../errors/ProviderError';
import {Result} from '../../../logic/Result';

export namespace TokenProviderErrors {
  export class TokenMalformedError extends Result<ProviderError> {
    constructor() {
      super(false, new ProviderError('Token Invalid'));
    }
  }

  export class InvalidTokenPayload extends Result<ProviderError> {
    constructor() {
      super(false, new ProviderError('Invalid Token Payload'));
    }
  }

  export class TokenExpiredError extends Result<ProviderError> {
    constructor() {
      super(false, new ProviderError(`Token Expired`));
    }
  }

  export class Unauthorized extends Result<ProviderError> {
    constructor() {
      super(false, new ProviderError(`Unauthorized`));
    }
  }
}
