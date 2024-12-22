import { IUserRoles } from '../../interfaces/user.roles.interface';
import { IService } from '../email/email.interface';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  role: IUserRoles;
  designation: IService;
  isBlock: boolean;
  needPasswordChange: boolean;
}
