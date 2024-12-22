import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { IUserRoles } from '../interfaces/user.roles.interface';
import UserModel from '../modules/user/user.model';
import { catchAsync, verifyJWT } from '../utils';

export const auth = (...requiredRoles: IUserRoles[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(404, 'You are not authorize.');
    }

    const decoded = verifyJWT(token, config.accessToken as string);

    const { role, userId, iat } = decoded as JwtPayload;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AppError(404, 'User not found.');
    }

    if (user.isBlock) {
      throw new AppError(403, 'This user is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorize!');
    }

    if (
      user.passwordChangeAt &&
      UserModel.isJwtIssuedBeforePasswordChange(
        user.passwordChangeAt,
        iat as number,
      )
    ) {
      throw new AppError(404, 'You are not authorized.');
    }

    req.user = { email: user.email, role: user.role, userId: user._id };

    next();
  });
};
