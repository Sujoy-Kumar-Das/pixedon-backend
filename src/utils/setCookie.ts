import { Response } from 'express';

interface SetCookieParams {
  res: Response;
  key: string;
  value: string;
  options?: {
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'lax' | 'strict' | 'none';
    maxAge?: number;
  };
}

const setCookie = ({ res, key, value, options }: SetCookieParams): void => {
  const { sameSite = true, httpOnly = true, secure = true } = options;

  res.cookie(key, value, {
    sameSite,
    httpOnly,
    secure,
    ...options,
  });
};

export default setCookie;
