import {UserRole} from "../../../../../common/Constants";

export interface RegisterUserDTO {
  username: string;
  password: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
}
