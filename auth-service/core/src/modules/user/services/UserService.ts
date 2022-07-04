import CompositionRoot from '../../../application-service/CompositionRoot';
import {BaseService} from '../../../services/BaseService';
import {User} from '../domains/User';
import {IUserRepository} from '../repositories/IUserRepository';
import {IUserService} from './IUserService';

export class UserService
  extends BaseService
  implements IUserService
{
  constructor(
    protected userRepository: IUserRepository,
  ) {
    super('RepositoryUserService');
  }
  
  async createUser(user: User): Promise<void> {
    const methodName = 'createUser';
    const traceId = CompositionRoot.getTraceId();
    this.logger.trace({methodName, traceId}, `BEGIN`);

    this.logger.debug({methodName, traceId, args: {user}});

    const createdUser = await this.userRepository.create(user);

    this.logger.trace({methodName, traceId}, `END`);

    return createdUser;
  }
}
