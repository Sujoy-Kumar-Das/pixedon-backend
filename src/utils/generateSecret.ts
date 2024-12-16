import crypto from 'crypto';

export const generateSecret = (byte: number) =>
  crypto.randomBytes(byte).toString('hex');
