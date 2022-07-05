export const InjectionToken = {
  Namespace: 'NAMESPACE',
  LoggerManager: 'LOGGER_MANAGER',
  LogLevel: 'LOG_LEVEL',
  DefaultRegion: 'DEFAULT_REGION',
  NodeEnv: 'NODE_ENV',

  // MODELS
  UserModel: 'USER_MODEL',

  // QUERIES
  UserQuery: 'USER_QUERY',

  // APPLICATION SERVICES
  UserApplicationService: 'USER_APPLICATION_SERVICE',

  // SERVICES
  UserService: 'USER_SERVICE',
  AuthService: 'AURH_SERVICE',

  // USE CASES
  RegisterUserUseCase: 'REGISTER_USER_USE_CASE',
  UserDetailUseCase: 'USER_DETAIL_USE_CASE',
  UserLoginUseCase: 'USER_LOGIN_USE_CASE',

  // REPOSITORY
  UserRepository: 'USER_REPOSITORY',

  // PROVIDERS
  TokenProvider: 'TOKEN_PROVIDER',

  // TOKEN:
  PrivateKey: 'PRIVATE_KEY',
  AccessTokenDuration: 'ACCESS_TOKEN_DURATION',
  RefreshTokenDuration: 'REFRESH_TOKEN_DURATION',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
