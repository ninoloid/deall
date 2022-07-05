import {UserRole} from "../../../common/Constants";

export interface AccessTokenPayloadDTO {
  id: string;
  username: string;
  role: UserRole;
  exp?: number;
}
