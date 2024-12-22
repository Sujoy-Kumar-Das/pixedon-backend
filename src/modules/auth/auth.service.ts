import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { createJWTToken } from '../../utils';
import hashPassword from '../../utils/hashPassword';
import UserModel from '../user/user.model';
import { IChangePassword, ILoginUser } from './auth.interface';

const loginService = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError(404, 'This user is not exists');
  }

  if (user?.isBlock) {
    throw new AppError(403, 'This user is blocked.');
  }

  const hashedPassword = user.password as string;

  //   check is the password matched
  const isPasswordMatched = await UserModel.isPasswordMatched({
    hashedPassword,
    plainTextPassword: password,
  });

  if (!isPasswordMatched) {
    throw new AppError(403, 'Wrong password.');
  }

  const jwtPayload = {
    role: user.role,
    userId: user._id,
  };

  const accessToken = createJWTToken({
    payload: jwtPayload,
    secret: config.accessToken as string,
    options: {
      expiresIn: '1d',
    },
  });

  const refreshToken = createJWTToken({
    payload: jwtPayload,
    secret: config.accessToken as string,
    options: {
      expiresIn: '10d',
    },
  });

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: IChangePassword,
) => {
  const { oldPassword, newPassword } = payload;
  const { email, role, userId } = userData;

  const user = await UserModel.findOne({ _id: userId, email, role });

  if (!user) {
    throw new AppError(404, 'This user is not exists');
  }

  const currentPassword = user.password as string;

  //   check is the password matched
  const isPasswordMatched = await UserModel.isPasswordMatched({
    plainTextPassword: oldPassword,
    hashedPassword: currentPassword,
  });

  if (!isPasswordMatched) {
    throw new AppError(403, 'Old password is wrong.');
  }

  const newHashedPassword = await hashPassword(newPassword);

  const isOldAndNewPasswordAreSame = await UserModel.isPasswordMatched({
    plainTextPassword: newPassword,
    hashedPassword: currentPassword,
  });

  if (isOldAndNewPasswordAreSame) {
    throw new AppError(401, 'New password must be different.');
  }

  await UserModel.findOneAndUpdate(
    {
      email: user.email,
      role: user.role,
      _id: user._id,
    },
    {
      password: newHashedPassword,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};

export const authService = {
  loginService,
  changePassword,
};
