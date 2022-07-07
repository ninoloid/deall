import CompositionRoot from '../../../application-service/CompositionRoot';
import {UserRole} from '../../../common/Constants';
import {BaseService} from '../../../services/BaseService';
import {AuthenticationToken} from '../../common/domains/AuthenticationToken';
import {AccessTokenPayloadDTO} from '../dtos/AccessTokenPayloadDTO';
import {ITokenProvider} from '../providers/ITokenProvider';
import {IAuthService} from './IAuthService';

export class RepositoryAuthService extends BaseService implements IAuthService {
  constructor(protected params: RepositoryAuthServiceParams) {
    super('RepositoryAuthService');
  }

  async generateAuthenticationToken(
    id: string,
    username: string,
    role: UserRole,
  ): Promise<AuthenticationToken> {
    const methodName = `generateAuthenticationToken`;
    const traceId = CompositionRoot.getTraceId();
    this.logger.trace({methodName, traceId}, `BEGIN`);

    this.logger.debug({methodName, traceId, args: {id, username}});

    const accessTokenPayload: AccessTokenPayloadDTO = {
      id,
      username,
      role,
    };

    const accessToken = await this.params.tokenProvider.signToken<AccessTokenPayloadDTO>(
      accessTokenPayload,
      this.params.privateKey,
      {expiresIn: this.params.accessTokenDuration},
    );

    const refreshTokenPayload: AccessTokenPayloadDTO = {
      id,
      username,
      role,
    };

    const refreshToken = await this.params.tokenProvider.signToken<AccessTokenPayloadDTO>(
      refreshTokenPayload,
      this.params.privateKey,
      {expiresIn: this.params.refreshTokenDuration},
    );

    const accessTokenPayloadDecode = this.params.tokenProvider.decodeToken<AccessTokenPayloadDTO>(
      accessToken,
    );
    const refreshTokenPayloadDecode = this.params.tokenProvider.decodeToken<AccessTokenPayloadDTO>(
      refreshToken,
    );

    const token = AuthenticationToken.create({
      accessToken,
      refreshToken,
      accessTokenExpired: new Date(accessTokenPayloadDecode.exp! * 1000),
      refreshTokenExpired: new Date(refreshTokenPayloadDecode.exp! * 1000),
    });

    this.logger.trace({methodName, traceId}, `END`);

    return token.getValue();
  }

  async generateAccessToken(
    id: string,
    username: string,
    role: UserRole,
    refreshToken: string,
  ): Promise<AuthenticationToken> {
    const methodName = `generateRefreshToken`;
    const traceId = CompositionRoot.getTraceId();
    this.logger.trace({methodName, traceId}, `BEGIN`);

    this.logger.debug({methodName, traceId, args: {id, username}});

    const accessTokenPayload: AccessTokenPayloadDTO = {
      id,
      username,
      role,
    };

    const accessToken = await this.params.tokenProvider.signToken<AccessTokenPayloadDTO>(
      accessTokenPayload,
      this.params.privateKey,
      {expiresIn: this.params.accessTokenDuration},
    );

    const accessTokenPayloadDecode = this.params.tokenProvider.decodeToken<AccessTokenPayloadDTO>(
      accessToken,
    );
    const refreshTokenPayloadDecode = this.params.tokenProvider.decodeToken<AccessTokenPayloadDTO>(
      refreshToken,
    );

    const token = AuthenticationToken.create({
      accessToken,
      refreshToken,
      accessTokenExpired: new Date(accessTokenPayloadDecode.exp! * 1000),
      refreshTokenExpired: new Date(refreshTokenPayloadDecode.exp! * 1000),
    });

    this.logger.trace({methodName, traceId}, `END`);

    return token.getValue();
  }
}

export interface RepositoryAuthServiceParams {
  tokenProvider: ITokenProvider;
  accessTokenDuration: string;
  refreshTokenDuration: string;
  privateKey: string;
}
