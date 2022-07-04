import CompositionRoot from '../../../application-service/CompositionRoot';
import {BaseRepository} from '../../../repository/BaseRepository';
import {User} from '../domains/User';
import {MongoUserMapper, MongoUserProps} from '../mappers/MongoUserMapper';
import {UserModel} from '../models/User';
import {IUserRepository} from './IUserRepository';

export class UserRepository
  extends BaseRepository<MongoUserProps>
  implements IUserRepository
{

  constructor(model: typeof UserModel) {
    super(model, 'MongooseUserRepository');
  }

  async create(user: User): Promise<void> {
    const methodName = `create`;
    const traceId = CompositionRoot.getTraceId();

    this.logger.trace({methodName, traceId}, `BEGIN`);

    const props = MongoUserMapper.toPersistence(user);

    const query = this.model.create(props)

    await query;

    this.logger.debug({methodName, traceId, query: {command: 'create user', props}});

    this.logger.trace({methodName, traceId}, `END`);
  }
}
