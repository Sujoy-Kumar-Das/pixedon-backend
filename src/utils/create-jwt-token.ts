import jwt, { SignOptions } from 'jsonwebtoken';

interface IJwtCreateToken<T extends string | object | Buffer> {
  payload: T;
  secret: string;
  options?: SignOptions;
}

export const createJWTToken = <T extends string | object | Buffer>({
  payload,
  secret,
  options,
}: IJwtCreateToken<T>): string => {
  return jwt.sign(payload, secret, options);
};
