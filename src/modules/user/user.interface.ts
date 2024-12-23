import { Model } from 'mongoose';
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
  passwordChangeAt: Date | null;
  resetTime: Date | null;
}

export interface IUserMethods extends Model<IUser> {
  isJwtIssuedBeforePasswordChange(
    passwordChangeAt: Date,
    jwtIssuedTime: number,
  ): boolean;

  isPasswordMatched({
    plainTextPassword,
    hashedPassword,
  }: {
    plainTextPassword: string;
    hashedPassword: string;
  }): Promise<boolean>;
}
