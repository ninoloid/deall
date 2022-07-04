import CompositionRoot from '../application-service/CompositionRoot';
import {ILogger} from '../common/logging/ILogger';
import {UseCase} from '../domain/UseCase';

export abstract class BaseUseCase<IRequest, IResponse>
  implements UseCase<IRequest, IResponse> {
  protected logger: ILogger;

  constructor(protected name: string = 'BaseUseCase') {
    this.logger = CompositionRoot.getLoggerManager().getLogger(name);
  }

  abstract execute(request: IRequest): Promise<IResponse> | IResponse;
}
