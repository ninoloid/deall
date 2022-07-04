import {asFunction, asValue, AwilixContainer, createContainer} from 'awilix';
import {InjectionToken} from '../common/Constants';
import {ILoggerManager} from '../common/logging/ILoggerManager';
import {PinoLoggerManager} from '../common/logging/PinoLoggerManager';
import {createNamespace, Namespace} from 'cls-hooked';
import {IUserRepository} from '../modules/user/repositories/IUserRepository';
import {UserModel} from '../modules/user/models/User';
import {UserRepository} from '../modules/user/repositories/UserRepository';
import {UserService} from '../modules/user/services/UserService';
import {IUserService} from '../modules/user/services/IUserService';
import {RegisterUserUseCase} from '../modules/user/use-cases/commands/RegisterUserUseCase';
import {UserApplicationService} from './user/UserApplicationService';
import {IUserApplicationService} from './user/IUserApplicationService';
import { UserQuery } from '../modules/user/queries/UserQuery';
import { IUserQuery } from '../modules/user/queries/IUserQuery';
import { UserDetailUseCase } from '../modules/user/use-cases/queries/UserDetailUseCase';

const NAMEPSACE = 'Deall SejutaCita';
const ns = createNamespace(NAMEPSACE);

let _container: AwilixContainer;

export default class CompositionRoot {
  public static composeApplication(): void {
    if (!_container) {
      _container = createContainer();
      this.composeNamespace();
      this.composeLoggingComponents();
      this.composeModels();
      this.composeRepositories();
      this.composeQueries();
      this.composeServices();
      this.composeUseCases();
      this.composeUserApplicationService();
    }
  }

  // COMPOSER
  private static composeNamespace(): void {
    _container.register<Namespace>(
      InjectionToken.Namespace,
      asFunction(() => {
        return ns;
      }),
    );
  }

  private static composeLoggingComponents(): void {
    const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug';
    _container.register<string>(InjectionToken.LogLevel, asValue(logLevel));

    _container.register<ILoggerManager>(
      InjectionToken.LoggerManager,
      asFunction(() => {
        PinoLoggerManager.setLogLevel(logLevel);
        return PinoLoggerManager;
      }).singleton(),
    );
  }

  private static composeModels(): void {
    _container.register(
      InjectionToken.UserModel,
      asFunction(() => {
        return UserModel
      })
    )
  }

  private static composeRepositories(): void {
    _container.register<IUserRepository>(
      InjectionToken.UserRepository,
      asFunction(() => {
        const userModel = _container.resolve(InjectionToken.UserModel);
        return new UserRepository(userModel)
      })
    )
  }

  private static composeQueries(): void {
    _container.register<IUserQuery>(
      InjectionToken.UserQuery,
      asFunction(() => {
        const userModel = _container.resolve(InjectionToken.UserModel);
        return new UserQuery(userModel)
      })
    )
  }

  private static composeServices(): void {
    _container.register<IUserService>(
      InjectionToken.UserService,
      asFunction(() => {
        const userRepository = _container.resolve<IUserRepository>(
          InjectionToken.UserRepository,
        );

        return new UserService(userRepository);
      }).singleton(),
    );
  }

  private static composeUseCases(): void {
    // User Commands
    _container.register<RegisterUserUseCase>(
      InjectionToken.RegisterUserUseCase,
      asFunction(() => {
        const userService = _container.resolve<IUserService>(
          InjectionToken.UserService,
        );

        return new RegisterUserUseCase(userService);
      }).singleton(),
    );

    // User Queries
    _container.register<UserDetailUseCase>(
      InjectionToken.UserDetailUseCase,
      asFunction(() => {
        const userService = _container.resolve<IUserQuery>(
          InjectionToken.UserQuery,
        );

        return new UserDetailUseCase(userService);
      }).singleton(),
    );
  }

  private static composeUserApplicationService(): void {
    _container.register(
      InjectionToken.UserApplicationService,
      asFunction(() => {
        return new UserApplicationService({
          registerUser: _container.resolve<RegisterUserUseCase>(
            InjectionToken.RegisterUserUseCase,
          ),

          userDetail: _container.resolve<UserDetailUseCase>(
            InjectionToken.UserDetailUseCase
          )
        });
      }),
    );
  }

// GETTER
  public static getLoggerManager(): ILoggerManager {
    return _container.resolve<ILoggerManager>(InjectionToken.LoggerManager);
}

  public static getApplicationNamespace(): Namespace {
    return _container.resolve<Namespace>(InjectionToken.Namespace);
  }

  public static getTraceId(): string {
    return this.getApplicationNamespace().get('traceId');
  }

  public static getUserApplicationService(): IUserApplicationService {
    return _container.resolve<IUserApplicationService>(
      InjectionToken.UserApplicationService,
    );
  }
}
