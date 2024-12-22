import config from '../../config';
import AppError from '../../errors/AppError';
import { createJWTToken } from '../../utils';
import UserModel from '../user/user.model';
import { ILoginUser } from './auth.interface';

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

export const authService = {
  loginService,
};
