import CompositionRoot from '../application-service/CompositionRoot';
import {ILogger} from '../common/logging/ILogger';

export abstract class BaseProvider {
  protected logger: ILogger;

  constructor(protected name: string) {
    this.logger = CompositionRoot.getLoggerManager().getLogger(name);
  }
}
