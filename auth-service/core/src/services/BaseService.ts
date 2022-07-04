import CompositionRoot from '../application-service/CompositionRoot';
import {ILogger} from '../common/logging/ILogger';

export abstract class BaseService {
  protected logger: ILogger;

  constructor(protected name: string = 'BaseService') {
    this.logger = CompositionRoot.getLoggerManager().getLogger(name);
  }
}
