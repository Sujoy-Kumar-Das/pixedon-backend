import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';

export const verifyJWT = (token: string, secret: string) => {
  try {
    if (!token) {
      throw new AppError(404, 'Token is not found.');
    }

    return jwt.verify(token, secret);
  } catch {
    throw new AppError(404, 'Something went wrong!.Please try again.');
  }
};
