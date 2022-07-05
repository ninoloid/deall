import CompositionRoot from '../../../application-service/CompositionRoot';
import {UserRole} from '../../../common/Constants';
import {BaseRepository} from '../../../repository/BaseRepository';
import {MongoUserProps} from '../mappers/MongoUserMapper';
import {UserModel} from '../models/User';
import {UserCredentialVM} from '../vms/UserCredentialVM';
import {UserDetailVM} from '../vms/UserDetailVM';
import {IUserQuery} from './IUserQuery';

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

    const user: {
      id: string,
      username: string,
      name: string,
      email: string,
      phone?: string,
    } = await this.model.findById(id);

    if (user) {
      const userOrError = UserDetailVM.create({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
      })

      if (userOrError.isFailure) {
        throw userOrError.errorValue();
      }

      response = userOrError.getValue();
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

    const user: {
      id: string,
      username: string,
      password: string,
      role: string,
    } = await this.model.findOne({username});

    if (user) {
      const userOrError = UserCredentialVM.create({
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role as UserRole,
      })

      if (userOrError.isFailure) {
        throw userOrError.errorValue();
      }

      response = userOrError.getValue();
    };

    this.logger.debug({methodName, traceId, query: {command: 'get user credentials', props: user || {}}});

    this.logger.trace({methodName, traceId}, `END`);

    return response
  }
}
