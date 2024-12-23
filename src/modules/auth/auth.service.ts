import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { resetPasswordEmailTemplate } from '../../email-templates';
import AppError from '../../errors/AppError';
import { createJWTToken, verifyJWT } from '../../utils';
import hashPassword from '../../utils/hashPassword';
import { sendEmail } from '../../utils/sendEmail';
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

const forgotPassword = async (payload: { email: string }) => {
  const { email } = payload;

  // Find user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(404, 'This user is not found.');
  }

  if (user.isBlock) {
    throw new AppError(404, 'This user is blocked.');
  }

  // Check if the reset request is within the 2-minute limit
  const now = new Date();
  const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);

  if (user.resetTime && user.resetTime > twoMinutesAgo) {
    throw new AppError(
      401,
      'You can request a password reset only once every 2 minutes.',
    );
  }

  // Update resetTime
  await UserModel.findByIdAndUpdate(
    user._id,
    { resetTime: now },
    { new: true },
  );

  // Generate reset token (valid for 2 minutes)
  const forgotPasswordVerificationToken = createJWTToken({
    payload: { role: user.role, userId: user._id },
    secret: config.accessToken as string,
    options: {
      expiresIn: '2m',
    },
  });

  // Prepare the reset link and email content
  const resetLink = `${config.forgotPasswordFrontendLink}?token=${forgotPasswordVerificationToken}`;

  // Send reset email
  sendEmail({
    to: user.email,
    subject: 'Please reset your password.',
    html: resetPasswordEmailTemplate({ recipientName: user.name, resetLink }),
  });
};

const resetPassword = async (token: string, payload: { password: string }) => {
  const decoded = verifyJWT(token, config.accessToken as string);

  const { role, userId } = decoded as JwtPayload;

  const user = await UserModel.findOne({ _id: userId, role });

  if (!user) {
    throw new AppError(404, 'This user is not exists');
  }

  if (user?.isBlock) {
    throw new AppError(403, 'This user is blocked.');
  }

  const newHashedPassword = await hashPassword(payload.password);

  return await UserModel.findOneAndUpdate(
    { _id: user._id, role: user.role },
    {
      password: newHashedPassword,
      passwordChangeAt: new Date(),
      passwordWrongAttempt: 0,
      resetTime: null,
    },
    {
      new: true,
    },
  );
};

export const authService = {
  loginService,
  changePassword,
  forgotPassword,
  resetPassword,
};
