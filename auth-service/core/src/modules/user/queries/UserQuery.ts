import CompositionRoot from '../../../application-service/CompositionRoot';
import {BaseRepository} from '../../../repository/BaseRepository';
import {User} from '../domains/User';
import {MongoUserMapper, MongoUserProps} from '../mappers/MongoUserMapper';
import {UserModel} from '../models/User';
import { UserCredentialVM } from '../vms/UserCredentialVM';
import { JSONUserDetailVM, UserDetailVM } from '../vms/UserDetailVM';
import {IUserQuery } from './IUserQuery';

export class UserQuery
  extends BaseRepository<MongoUserProps>
  implements IUserQuery
{

  constructor(model: typeof UserModel) {
    super(model, 'MongooseUserQuery');
  }

  async getUserDetailById(id: string): Promise<UserDetailVM | undefined> {
    const methodName = `getUserDetailById`;
    const traceId = CompositionRoot.getTraceId();

    this.logger.trace({methodName, traceId}, `BEGIN`);

    let response: UserDetailVM | undefined;

    const user: UserDetailVM = await this.model.findById(id);

    if (user) {
      response = user
    };

    this.logger.debug({methodName, traceId, query: {command: 'get detail user', props: user || {}}});

    this.logger.trace({methodName, traceId}, `END`);

    return response
  }

  async getUserCredentialByUsername(username: string): Promise<UserCredentialVM> {
    const methodName = `getUserCredentialByUsername`;
    const traceId = CompositionRoot.getTraceId();

    this.logger.trace({methodName, traceId}, `BEGIN`);

    let response: UserCredentialVM | undefined;

    const user: UserCredentialVM = await this.model.findOne({username});

    if (user) {
      response = user
    };

    this.logger.debug({methodName, traceId, query: {command: 'get detail user', props: user || {}}});

    this.logger.trace({methodName, traceId}, `END`);

    return response
  }
}
